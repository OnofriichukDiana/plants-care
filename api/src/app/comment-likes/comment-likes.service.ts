import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { transform } from 'src/helpers/class-transformer';
import { CommentLike } from 'src/entities/like/comment-like.entity';
import { CommentLikes_Response } from './comment-likes.response';
import { CreateCommentLikesDto } from './dto/create-comment-like.dto';
import { PostComment } from 'src/entities/comment/post-comment.entity';

@Injectable()
export class CommentLikesService {
    constructor(@InjectDataSource() private readonly dateSource: DataSource) {}

    async findAll(commentId: string, page = '1', limit = '25') {
        const commentLikesRepository =
            this.dateSource.getRepository(CommentLike);

        const qb = commentLikesRepository
            .createQueryBuilder('commentLike')
            .leftJoinAndSelect('commentLike.auth', 'auth');

        let currentPage = +page;
        const totalItems = await qb.getCount();
        const totalPages = Math.ceil(totalItems / +limit);
        if (currentPage > totalPages) currentPage = 1;
        const paginationSkip = (currentPage - 1) * +limit;

        qb.skip(paginationSkip);
        qb.take(+limit);

        const commentLikes = await qb
            .where(`"commentLike"."commentId" = :commentId`, {
                commentId: +commentId,
            })
            .getMany();

        const items = commentLikes.map((like) =>
            transform(CommentLikes_Response, like),
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

    async isLiked(commentId: number, authId: number) {
        const commentLikesRepository =
            this.dateSource.getRepository(CommentLike);

        const isLiked = await commentLikesRepository
            .createQueryBuilder('commentLike')
            .where(`"commentLike"."commentId" = :commentId`, {
                commentId: commentId,
            })
            .andWhere(`"commentLike"."authId" = :authId`, {
                authId: authId,
            })
            .getOne();

        return Boolean(isLiked);
    }

    async create(createCommentLikesDto: CreateCommentLikesDto, authId: number) {
        const commentLikesRepository =
            this.dateSource.getRepository(CommentLike);
        const commentRepository = this.dateSource.getRepository(PostComment);

        const newCommentLike = await commentLikesRepository.save({
            authId,
            ...createCommentLikesDto,
        });
        const currentComment = await commentRepository.findOne({
            where: {
                id: createCommentLikesDto.commentId,
            },
        });

        await commentRepository.update(currentComment.id, {
            countLikes: currentComment.countLikes + 1,
        });

        return transform(CommentLikes_Response, newCommentLike);
    }

    async delete(commentId: number, authId: number) {
        const commentLikesRepository =
            this.dateSource.getRepository(CommentLike);
        const commentRepository = this.dateSource.getRepository(PostComment);

        await commentLikesRepository.delete({ authId, commentId });

        const currentComment = await commentRepository.findOne({
            where: {
                id: commentId,
            },
        });

        await commentRepository.update(currentComment.id, {
            countLikes: currentComment.countLikes - 1,
        });
    }
}
