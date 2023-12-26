import {
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { genSalt, hash } from 'bcryptjs';
import { transform } from 'src/helpers/class-transformer';
import { Users_Response } from './users.response';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { compare } from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async findAll(page = '1', limit = '25', nameOrTags) {
        const qb = this.usersRepository.createQueryBuilder('user');

        if (!!nameOrTags) {
            qb.where('user.name ILIKE :nameOrTags', {
                nameOrTags: `%${nameOrTags}%`,
            });
        }

        let currentPage = +page;
        const totalItems = await qb.getCount();
        const totalPages = Math.ceil(totalItems / +limit);
        if (currentPage > totalPages) currentPage = 1;
        const paginationSkip = (currentPage - 1) * +limit;

        qb.skip(paginationSkip);
        qb.take(+limit);

        const users = await qb.getMany();
        const items = users.map((user) => transform(Users_Response, user));

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

    async findOne(id: number) {
        const user = await this.usersRepository
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();

        if (!user) throw new NotFoundException();

        return transform(Users_Response, user);
    }

    async create(createUserDto: CreateUserDto) {
        const salt = await genSalt(10);
        const hashed = await hash(createUserDto.password, salt);
        createUserDto.password = hashed;

        const newUser = await this.usersRepository.save(createUserDto);

        return transform(Users_Response, newUser);
    }

    async update(userId: number, updateUserDto: UpdateUserDto) {
        await this.usersRepository.update(userId, updateUserDto);
        let user = await this.usersRepository.findOneBy({
            id: userId,
        });

        return transform(Users_Response, user);
    }

    async updatePassword(
        userId: number,
        authId: number,
        updatePasswordDto: UpdatePasswordDto,
    ) {
        if (userId !== authId) {
            throw new ForbiddenException();
        }
        const user = await this.usersRepository.findOneBy({
            id: userId,
        });

        const isPasswordMatch = await compare(
            updatePasswordDto.oldPassword,
            user.password,
        );

        if (!isPasswordMatch) {
            throw new UnauthorizedException(`Password is not correct`);
        }
        const salt = await genSalt(10);
        const hashed = await hash(updatePasswordDto.newPassword, salt);

        await this.usersRepository.update(userId, {
            ...user,
            password: hashed,
        });

        return transform(Users_Response, user);
    }
}
