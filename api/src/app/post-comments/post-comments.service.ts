import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { transform } from 'src/helpers/class-transformer';
import { PostComment } from 'src/entities/comment/post-comment.entity';
import { PostComments_Response } from './post-comments.response';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { CommentFilesService } from '../comment-files/comment-files.service';
import { Post } from 'src/entities/post/post.entity';

@Injectable()
export class PostCommentsService {
    constructor(
        @InjectDataSource() private readonly dateSource: DataSource,
        private commentFilesService: CommentFilesService,
    ) {}

    async findAll(
        postId: number,
        sortBy = 'createdAt',
        sortOrder: 'ASC' | 'DESC' = 'DESC',
    ) {
        const postCommentRepository =
            this.dateSource.getRepository(PostComment);
        const qb = postCommentRepository
            .createQueryBuilder('postComment')
            .where('postComment.postId = :postId', { postId })
            .leftJoinAndSelect('postComment.auth', 'auth')
            .leftJoinAndSelect('postComment.commentFiles', 'commentFiles')
            .leftJoinAndSelect('commentFiles.media', 'media');

        if (sortBy === 'createdAt') {
            qb.orderBy({ 'postComment.createdAt': sortOrder });
        }

        const postComments = await qb.getMany();
        return postComments.map((comment) =>
            transform(PostComments_Response, comment),
        );
    }

    async create(createPostCommentDto: CreatePostCommentDto, authId: number) {
        const postCommentRepository =
            this.dateSource.getRepository(PostComment);
        const postRepository = this.dateSource.getRepository(Post);

        const newPostComment = await postCommentRepository.save({
            authId,
            ...createPostCommentDto,
        });

        const currentPost = await postRepository.findOneBy({
            id: createPostCommentDto.postId,
        });

        await postRepository.update(currentPost.id, {
            countComments: currentPost.countComments + 1,
        });
        return newPostComment;
    }

    async remove(id: number, authId: number) {
        const postCommentRepository =
            this.dateSource.getRepository(PostComment);
        const postRepository = this.dateSource.getRepository(Post);
        const postComment = await postCommentRepository.findOne({
            where: { id },
            relations: { commentFiles: true, post: true },
        });

        if (!postComment) throw new NotFoundException();

        const currentPost = await postRepository.findOneBy({
            id: postComment.postId,
        });

        await postRepository.update(currentPost.id, {
            countComments: currentPost.countComments - 1,
        });

        if (postComment.authId !== authId || postComment.post.userId === authId)
            throw new ForbiddenException('You have no access to this resource');

        for (const file of postComment.commentFiles) {
            await this.commentFilesService.delete(file.id);
        }

        await postCommentRepository.delete({ id });
    }
}
