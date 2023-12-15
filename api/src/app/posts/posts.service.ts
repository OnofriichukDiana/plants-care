import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostsDto } from './dto/create-post.dto';
import { Post } from 'src/entities/post/post.entity';
import { transform } from 'src/helpers/class-transformer';
import { Posts_Response } from './posts.response';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,
    ) {}

    async findAll(
        page = '1',
        limit = '25',
        sortBy = 'createdAt',
        sortOrder: 'ASC' | 'DESC' = 'DESC',
    ) {
        const qb = this.postsRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.user', 'user')
            .leftJoinAndSelect('post.postFiles', 'postFiles')
            .leftJoinAndSelect('postFiles.media', 'media');

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
            .leftJoinAndSelect('post.postLikes', 'likes')
            .leftJoinAndSelect('likes.auth', 'likeAuth')
            .leftJoinAndSelect('post.postComments', 'comment')
            .leftJoinAndSelect('comment.commentFiles', 'commentFiles')
            .leftJoinAndSelect('comment.auth', 'commentAuth')
            .getOne();

        if (!post) throw new NotFoundException();

        console.log(post);

        return transform(Posts_Response, post);
    }

    async create(createPostsDto: CreatePostsDto, userId: number) {
        const newPost = await this.postsRepository.save({
            userId,
            ...createPostsDto,
        });
        return newPost;
    }
}
