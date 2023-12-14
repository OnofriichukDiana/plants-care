import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreatePostLikesDto } from './dto/create-post-like.dto';
import { transform } from 'src/helpers/class-transformer';
import { PostLikes_Response } from './post-likes.response';
import { PostLike } from 'src/entities/like/post-like.entity';
import { Post } from 'src/entities/post/post.entity';

@Injectable()
export class PostLikesService {
    constructor(@InjectDataSource() private readonly dateSource: DataSource) {}

    async isLiked(postId: number, authId: number) {
        const postLikesRepository = this.dateSource.getRepository(PostLike);

        const isLiked = await postLikesRepository
            .createQueryBuilder('postLike')
            .where(`"postLike"."postId" = :postId`, {
                postId: postId,
            })
            .andWhere(`"postLike"."authId" = :authId`, {
                authId: authId,
            })
            .getOne();

        return Boolean(isLiked);
    }

    async create(createPostLikesDto: CreatePostLikesDto, authId: number) {
        const postLikesRepository = this.dateSource.getRepository(PostLike);
        const postRepository = this.dateSource.getRepository(Post);

        const newPostLike = await postLikesRepository.save({
            authId,
            ...createPostLikesDto,
        });
        const currentPost = await postRepository.findOneBy({
            id: createPostLikesDto.postId,
        });

        await postRepository.update(currentPost.id, {
            countLikes: currentPost.countLikes + 1,
        });

        return transform(PostLikes_Response, newPostLike);
    }

    async delete(postId: number, authId: number) {
        const postLikesRepository = this.dateSource.getRepository(PostLike);
        const postRepository = this.dateSource.getRepository(Post);

        await postLikesRepository.delete({ authId, postId });

        const currentPost = await postRepository.findOneBy({
            id: postId,
        });

        await postRepository.update(currentPost.id, {
            countLikes: currentPost.countLikes - 1,
        });
    }
}
