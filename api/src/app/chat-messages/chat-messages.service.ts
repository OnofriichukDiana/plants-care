import { InjectRepository } from '@nestjs/typeorm';
import {
    Brackets,
    DataSource,
    EntityManager,
    Repository,
    SelectQueryBuilder,
} from 'typeorm';
import { CreateChatMessagesDto } from './dto/create.dto';
import { ChatMessage } from 'src/entities/chat/chat-message.entity';
import { transform } from 'src/helpers/class-transformer';
import { ChatMessages_Response } from './chat-messages.response';
import { NotFoundException } from '@nestjs/common';
import { ChatGateway } from './chat-messages-gateway';

export class ChatMessagesService {
    constructor(
        @InjectRepository(ChatMessage)
        private readonly chatMessagesRepository: Repository<ChatMessage>,
        private readonly chatGateway: ChatGateway,
    ) {}

    async findAll(
        page = '1',
        limit = '25',
        user: string,
        participantId: number,
        userId: number,
    ) {
        const qb = this.chatMessagesRepository
            .createQueryBuilder('chatMessages')
            .leftJoinAndSelect('chatMessages.fromUser', 'fromUser')
            .leftJoinAndSelect('chatMessages.toUser', 'toUser')
            .where(
                new Brackets((qb) => {
                    qb.orWhere('chatMessages.fromUserId = :userId', { userId });
                    qb.orWhere('chatMessages.toUserId = :userId', { userId });
                }),
            );

        if (!!user) {
            qb.andWhere('fromUser.name = :user', { user });
            qb.andWhere('toUser.name = :user', { user });
        } else if (!!participantId) {
            qb.andWhere(
                new Brackets((qb) => {
                    qb.orWhere('fromUser.id = :participantId', {
                        participantId,
                    });
                    qb.orWhere('toUser.id = :participantId', { participantId });
                }),
            );
        } else {
            qb.andWhere(
                'chatMessages.id IN' +
                    qb
                        .subQuery()
                        .select('MAX(cm.id)', 'maxId')
                        .from('chat_message', 'cm')
                        .groupBy(
                            'CASE WHEN cm.fromUserId = :userId THEN cm.toUserId ELSE cm.fromUserId END',
                        )
                        .getQuery(),
            );
        }

        qb.orderBy({ 'chatMessages.createdAt': 'DESC' });

        let currentPage = +page;
        const totalItems = await qb.getCount();
        const totalPages = Math.ceil(totalItems / +limit);
        if (currentPage > totalPages) currentPage = 1;
        const paginationSkip = (currentPage - 1) * +limit;

        qb.skip(paginationSkip);
        qb.take(+limit);

        const chats = await qb.getMany();
        const items = chats.map((chat) =>
            transform(ChatMessages_Response, chat),
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

    async countUnreaded(userId: number) {
        const count = await this.chatMessagesRepository
            .createQueryBuilder('chatMessages')
            .select('id')
            .where('chatMessages.toUserId = :userId', { userId })
            .andWhere('chatMessages.isViewed = false')
            .getCount();

        return count;
    }

    async create(createChatMessagesDto: CreateChatMessagesDto, userId: number) {
        const _newMessage = await this.chatMessagesRepository.save({
            fromUserId: userId,
            ...createChatMessagesDto,
        });
        const newMessage = await this.chatMessagesRepository.findOne({
            where: { id: _newMessage.id },
            relations: { fromUser: true },
        });
        this.chatGateway.handleMessage(newMessage);

        return newMessage;
    }

    async setViewed(userId: number, dto) {
        await this.chatMessagesRepository.update(
            {
                toUserId: userId,
                fromUserId: dto.participantId,
                isViewed: false,
            },
            { isViewed: true },
        );

        this.chatGateway.handleMarkViewed(dto.participantId, userId);
    }
}
