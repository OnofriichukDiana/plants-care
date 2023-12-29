import { getApiPropertyMetadata } from 'src/helpers/getApiPropertyMetadata';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { User } from '../../user/user.entity';
import { Post } from 'src/entities/post/post.entity';
import { PostComment } from '../post-comment.entity';
import { CommentFile } from 'src/entities/media/comment-file.entity';
import { CommentLike } from 'src/entities/like/comment-like.entity';

export class PostCommentResponse implements PostComment {
    @ApiProperty(getApiPropertyMetadata(PostComment, 'id'))
    @Expose()
    id: number;

    @ApiProperty(getApiPropertyMetadata(PostComment, 'message'))
    @Expose()
    message: string;

    @ApiProperty(getApiPropertyMetadata(PostComment, 'countLikes'))
    @Expose()
    countLikes: number;

    @ApiProperty(getApiPropertyMetadata(PostComment, 'postId'))
    @Expose()
    postId: number;

    @ApiProperty(getApiPropertyMetadata(PostComment, 'post'))
    @Expose()
    post: Post;

    @ApiProperty(getApiPropertyMetadata(PostComment, 'authId'))
    @Expose()
    authId: number;

    @ApiProperty(getApiPropertyMetadata(PostComment, 'auth'))
    @Expose()
    auth: User;

    @ApiProperty(getApiPropertyMetadata(PostComment, 'parentId'))
    @Expose()
    parentId: number;

    @ApiProperty(getApiPropertyMetadata(PostComment, 'parent'))
    @Expose()
    parent: PostComment;

    @ApiProperty(getApiPropertyMetadata(PostComment, 'children'))
    @Expose()
    children: PostComment[];

    @ApiProperty(getApiPropertyMetadata(PostComment, 'commentFiles'))
    @Expose()
    commentFiles: CommentFile[];

    @ApiProperty(getApiPropertyMetadata(PostComment, 'commentLikes'))
    @Expose()
    commentLikes: CommentLike[];

    @ApiProperty(getApiPropertyMetadata(PostComment, 'createdAt'))
    @Expose()
    createdAt: Date;

    @ApiProperty(getApiPropertyMetadata(PostComment, 'updatedAt'))
    @Expose()
    updatedAt: Date;
}
