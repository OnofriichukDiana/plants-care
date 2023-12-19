import { getApiPropertyMetadata } from 'src/helpers/getApiPropertyMetadata';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { User } from '../../user/user.entity';
import { CommentLike } from '../comment-like.entity';
import { PostComment } from 'src/entities/comment/post-comment.entity';

export class CommentLikeResponse implements CommentLike {
    @ApiProperty(getApiPropertyMetadata(CommentLike, 'id'))
    @Expose()
    id: number;

    @ApiProperty(getApiPropertyMetadata(CommentLike, 'commentId'))
    @Expose()
    commentId: number;

    @ApiProperty(getApiPropertyMetadata(CommentLike, 'comment'))
    @Expose()
    comment: PostComment;

    @ApiProperty(getApiPropertyMetadata(CommentLike, 'authId'))
    @Expose()
    authId: number;

    @ApiProperty(getApiPropertyMetadata(CommentLike, 'auth'))
    @Expose()
    auth: User;

    @ApiProperty(getApiPropertyMetadata(CommentLike, 'createdAt'))
    @Expose()
    createdAt: Date;

    @ApiProperty(getApiPropertyMetadata(CommentLike, 'updatedAt'))
    @Expose()
    updatedAt: Date;
}
