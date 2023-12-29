import { getApiPropertyMetadata } from 'src/helpers/getApiPropertyMetadata';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { User } from '../../user/user.entity';
import { PostLike } from 'src/entities/like/post-like.entity';
import { Post } from 'src/entities/post/post.entity';

export class PostLikeResponse implements PostLike {
    @ApiProperty(getApiPropertyMetadata(PostLike, 'id'))
    @Expose()
    id: number;

    @ApiProperty(getApiPropertyMetadata(PostLike, 'postId'))
    @Expose()
    postId: number;

    @ApiProperty(getApiPropertyMetadata(PostLike, 'post'))
    @Expose()
    post: Post;

    @ApiProperty(getApiPropertyMetadata(PostLike, 'authId'))
    @Expose()
    authId: number;

    @ApiProperty(getApiPropertyMetadata(PostLike, 'auth'))
    @Expose()
    auth: User;

    @ApiProperty(getApiPropertyMetadata(PostLike, 'createdAt'))
    @Expose()
    createdAt: Date;

    @ApiProperty(getApiPropertyMetadata(PostLike, 'updatedAt'))
    @Expose()
    updatedAt: Date;
}
