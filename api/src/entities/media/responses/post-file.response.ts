import { getApiPropertyMetadata } from 'src/helpers/getApiPropertyMetadata';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Media } from '../media.entity';
import { PostFile } from '../post-file.entity';
import { Post } from 'src/entities/post/post.entity';

export class PostFileResponse implements PostFile {
    @ApiProperty(getApiPropertyMetadata(PostFile, 'id'))
    @Expose()
    id: number;

    @ApiProperty(getApiPropertyMetadata(PostFile, 'postId'))
    @Expose()
    postId: number;

    @ApiProperty(getApiPropertyMetadata(PostFile, 'post'))
    @Expose()
    post: Post;

    @ApiProperty(getApiPropertyMetadata(PostFile, 'mediaId'))
    @Expose()
    mediaId: number;

    @ApiProperty(getApiPropertyMetadata(PostFile, 'media'))
    @Expose()
    media: Media;

    @ApiProperty(getApiPropertyMetadata(PostFile, 'createdAt'))
    @Expose()
    createdAt: Date;

    @ApiProperty(getApiPropertyMetadata(PostFile, 'updatedAt'))
    @Expose()
    updatedAt: Date;
}
