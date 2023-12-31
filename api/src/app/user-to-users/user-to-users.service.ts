import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from 'src/entities/user/user.entity';
import { transform } from 'src/helpers/class-transformer';
import { UserToUser } from 'src/entities/user/user-to-user.entity';
import { CreateUserToUserDto } from './dto/create-user-to-user.dto';
import { UserToUsers_Response } from './user-to-users.response';

@Injectable()
export class UserToUsersService {
    constructor(
        @InjectDataSource()
        private readonly dateSource: DataSource,
    ) {}

    async findAll(
        page = '1',
        limit = '25',
        subscriberId: string,
        subscriptionId: string,
    ) {
        const userToUserRepository = this.dateSource.getRepository(UserToUser);

        const qb = userToUserRepository.createQueryBuilder('userToUser');

        if (!!subscriberId) {
            qb.leftJoinAndSelect('userToUser.subscription', 'subscription');
            qb.where(`"userToUser"."subscriberId" = :subscriberId`, {
                subscriberId: +subscriberId,
            });
        }

        if (!!subscriptionId) {
            qb.leftJoinAndSelect('userToUser.subscriber', 'subscriber');
            qb.where(`"userToUser"."subscriptionId" = :subscriptionId`, {
                subscriptionId: +subscriptionId,
            });
        }

        let currentPage = +page;
        const totalItems = await qb.getCount();
        const totalPages = Math.ceil(totalItems / +limit);
        if (currentPage > totalPages) currentPage = 1;
        const paginationSkip = (currentPage - 1) * +limit;

        qb.skip(paginationSkip);
        qb.take(+limit);

        const userToUsers = await qb.getMany();

        const items = userToUsers.map((utu) =>
            transform(UserToUsers_Response, utu),
        );

        const result = {
            items,
            currentPage,
            limit,
            totalItems,
            totalPages,
            nextPage: totalPages - currentPage > 0 ? currentPage + 1 : null,
            prevPage:
                currentPage > 1 && totalPages > 1 ? currentPage - 1 : null,
        };

        return result;
    }

    async isSubscribed(userId: number, authId: number) {
        const userToUserRepository = this.dateSource.getRepository(UserToUser);

        const isSubscribed = await userToUserRepository
            .createQueryBuilder('userToUser')
            .where(`"userToUser"."subscriberId" = :authId`, {
                authId,
            })
            .andWhere(`"userToUser"."subscriptionId" = :userId`, {
                userId,
            })
            .getOne();

        return Boolean(isSubscribed);
    }

    async create(createUserToUserDto: CreateUserToUserDto, authId: number) {
        const userToUserRepository = this.dateSource.getRepository(UserToUser);
        const userRepository = this.dateSource.getRepository(User);

        const newUserToUser = await userToUserRepository.save({
            subscriberId: authId,
            ...createUserToUserDto,
        });

        const subscriber = await userRepository.findOne({
            where: {
                id: authId,
            },
        });

        const subscription = await userRepository.findOne({
            where: {
                id: createUserToUserDto.subscriptionId,
            },
        });

        await userRepository.update(subscriber.id, {
            countSubscriptions: subscriber.countSubscriptions + 1,
        });

        await userRepository.update(subscription.id, {
            countSubscribers: subscription.countSubscribers + 1,
        });

        return transform(UserToUsers_Response, newUserToUser);
    }

    async delete(userId: number, authId: number) {
        const userToUserRepository = this.dateSource.getRepository(UserToUser);
        const userRepository = this.dateSource.getRepository(User);

        await userToUserRepository.delete({
            subscriberId: authId,
            subscriptionId: userId,
        });

        const subscriber = await userRepository.findOne({
            where: {
                id: authId,
            },
        });

        const subscription = await userRepository.findOne({
            where: {
                id: userId,
            },
        });

        await userRepository.update(subscriber.id, {
            countSubscriptions: subscriber.countSubscriptions - 1,
        });

        await userRepository.update(subscription.id, {
            countSubscribers: subscription.countSubscribers - 1,
        });
    }
}
