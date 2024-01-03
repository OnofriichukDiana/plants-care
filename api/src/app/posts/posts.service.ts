import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostsDto } from './dto/create-post.dto';
import { Post } from 'src/entities/post/post.entity';
import { transform } from 'src/helpers/class-transformer';
import { Posts_Response } from './posts.response';
import { PostFilesService } from '../post-files/post-files.service';
import { PostCommentsService } from '../post-comments/post-comments.service';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,
        private postFilesService: PostFilesService,
        private postCommentsService: PostCommentsService,
    ) {}

    async findAll(
        page = '1',
        limit = '25',
        sortBy = 'createdAt',
        sortOrder: 'ASC' | 'DESC' = 'DESC',
        nameOrTags: string,
        userId: number,
        subscriberId: number,
    ) {
        const qb = this.postsRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.user', 'user')
            .leftJoinAndSelect('post.postFiles', 'postFiles')
            .leftJoinAndSelect('postFiles.media', 'media');

        if (!!nameOrTags) {
            qb.andWhere(
                'EXISTS (SELECT 1 FROM unnest(post.tags) AS item WHERE item ILIKE :nameOrTags)',
                { nameOrTags: `%${nameOrTags}%` },
            );
        }
        if (!!userId) {
            qb.andWhere('user.id = :userId', { userId });
        }

        if (!!subscriberId) {
            qb.leftJoinAndSelect('user.subscriptions', 'subscription');
            qb.where('subscription.subscriberId = :subscriberId', {
                subscriberId,
            });
            qb.orWhere('post.userId = :subscriberId', { subscriberId });
        }

        let currentPage = +page;
        const totalItems = await qb.getCount();
        const totalPages = Math.ceil(totalItems / +limit);
        if (currentPage > totalPages) currentPage = 1;
        const paginationSkip = (currentPage - 1) * +limit;

        qb.skip(paginationSkip);
        qb.take(+limit);

        if (sortBy === 'createdAt') {
            qb.orderBy({ 'post.createdAt': sortOrder });
        }

        const posts = await qb.getMany();
        const items = posts.map((post) => transform(Posts_Response, post));

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
        const post = await this.postsRepository
            .createQueryBuilder('post')
            .where('post.id = :id', { id })
            .leftJoinAndSelect('post.user', 'user')
            .leftJoinAndSelect('post.postFiles', 'postFiles')
            .leftJoinAndSelect('postFiles.media', 'media')
            .getOne();

        if (!post) throw new NotFoundException();

        return transform(Posts_Response, post);
    }

    async create(createPostsDto: CreatePostsDto, userId: number) {
        const newPost = await this.postsRepository.save({
            userId,
            ...createPostsDto,
        });
        return newPost;
    }

    async remove(id: number, userId: number) {
        const post = await this.postsRepository.findOne({
            where: { id },
            relations: { postFiles: true, postComments: true },
        });

        if (!post) {
            throw new NotFoundException();
        }

        if (post.userId !== userId)
            throw new ForbiddenException('You have no access to this resource');

        for (const file of post.postFiles) {
            await this.postFilesService.delete(file.id);
        }

        for (const comment of post.postComments) {
            if (comment.parentId === null) {
                await this.postCommentsService.remove(comment.id, userId);
            }
        }

        await this.postsRepository.delete({ id });
    }
}
