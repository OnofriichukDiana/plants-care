import { getApiPropertyMetadata } from 'src/helpers/getApiPropertyMetadata';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Media } from '../media.entity';
import { PostFile } from '../post-file.entity';
import { CommentFile } from '../comment-file.entity';
import { ChatMessageFile } from '../chat-message-file.entity';

export class MediaResponse implements Media {
    @ApiProperty(getApiPropertyMetadata(Media, 'id'))
    @Expose()
    id: number;

    @ApiProperty(getApiPropertyMetadata(Media, 'path'))
    @Expose()
    path: string;

    @ApiProperty(getApiPropertyMetadata(Media, 'name'))
    @Expose()
    name: string;

    @ApiProperty(getApiPropertyMetadata(Media, 'size'))
    @Expose()
    size: number;

    @ApiProperty(getApiPropertyMetadata(Media, 'mime'))
    @Expose()
    mime: string;

    @ApiProperty(getApiPropertyMetadata(Media, 'postFiles'))
    @Expose()
    postFiles: PostFile[];

    @ApiProperty(getApiPropertyMetadata(Media, 'commentFiles'))
    @Expose()
    commentFiles: CommentFile[];

    @ApiProperty(getApiPropertyMetadata(Media, 'chatMessageFiles'))
    @Expose()
    chatMessageFiles: ChatMessageFile[];

    @ApiProperty(getApiPropertyMetadata(Media, 'createdAt'))
    @Expose()
    createdAt: Date;

    @ApiProperty(getApiPropertyMetadata(Media, 'updatedAt'))
    @Expose()
    updatedAt: Date;
}
