import { BadRequestException, Injectable } from '@nestjs/common';
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
        relations = null,
    ) {
        const qb = this.postsRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.user', 'user')
            .leftJoinAndSelect('post.postFiles', 'postFiles')
            .leftJoinAndSelect('postFiles.media', 'media');

        // if (relations) {
        //     relations.forEach((relation) => {
        //         const relationChain = relation.split('.'); // Split the relation chain
        //         let joinPath = 'post';

        //         relationChain.forEach((subRelation) => {
        //             joinPath += `.${subRelation}`;
        //             qb.leftJoinAndSelect(joinPath, subRelation);
        //         });
        //     });
        // }

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

    async create(createPostsDto: CreatePostsDto, userId: number) {
        const newPost = await this.postsRepository.save({
            userId,
            ...createPostsDto,
        });
        return newPost;
    }
}
