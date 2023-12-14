import { getApiPropertyMetadata } from 'src/helpers/getApiPropertyMetadata';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Post } from '../post.entity';
import { User } from '../../user/user.entity';
import { PostFile } from 'src/entities/media/post-file.entity';
import { PostLike } from 'src/entities/like/post-like.entity';
import { PostComment } from 'src/entities/comment/post-comment.entity';

export class PostResponse implements Post {
    @ApiProperty(getApiPropertyMetadata(Post, 'id'))
    @Expose()
    id: number;

    @ApiProperty(getApiPropertyMetadata(Post, 'message'))
    @Expose()
    message: string;

    @ApiProperty(getApiPropertyMetadata(Post, 'countLikes'))
    @Expose()
    countLikes: number;

    @ApiProperty(getApiPropertyMetadata(Post, 'countComments'))
    @Expose()
    countComments: number;

    @ApiProperty(getApiPropertyMetadata(Post, 'isShowTags'))
    @Expose()
    isShowTags: boolean;

    @ApiProperty(getApiPropertyMetadata(Post, 'tags'))
    @Expose()
    tags: string[];

    @ApiProperty(getApiPropertyMetadata(Post, 'userId'))
    @Expose()
    userId: number;

    @ApiProperty(getApiPropertyMetadata(Post, 'user'))
    @Expose()
    user: User;

    @ApiProperty(getApiPropertyMetadata(Post, 'postFiles'))
    @Expose()
    postFiles: PostFile[];

    @ApiProperty(getApiPropertyMetadata(Post, 'postLikes'))
    @Expose()
    postLikes: PostLike[];

    @ApiProperty(getApiPropertyMetadata(Post, 'postComments'))
    @Expose()
    postComments: PostComment[];

    @ApiProperty(getApiPropertyMetadata(Post, 'createdAt'))
    @Expose()
    createdAt: Date;

    @ApiProperty(getApiPropertyMetadata(Post, 'updatedAt'))
    @Expose()
    updatedAt: Date;
}
