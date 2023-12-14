import { getApiPropertyMetadata } from 'src/helpers/getApiPropertyMetadata';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Media } from '../media.entity';
import { CommentFile } from '../comment-file.entity';
import { PostComment } from 'src/entities/comment/post-comment.entity';

export class CommentFileResponse implements CommentFile {
    @ApiProperty(getApiPropertyMetadata(CommentFile, 'id'))
    @Expose()
    id: number;

    @ApiProperty(getApiPropertyMetadata(CommentFile, 'commentId'))
    @Expose()
    commentId: number;

    @ApiProperty(getApiPropertyMetadata(CommentFile, 'comment'))
    @Expose()
    comment: PostComment;

    @ApiProperty(getApiPropertyMetadata(CommentFile, 'mediaId'))
    @Expose()
    mediaId: number;

    @ApiProperty(getApiPropertyMetadata(CommentFile, 'media'))
    @Expose()
    media: Media;

    @ApiProperty(getApiPropertyMetadata(CommentFile, 'createdAt'))
    @Expose()
    createdAt: Date;

    @ApiProperty(getApiPropertyMetadata(CommentFile, 'updatedAt'))
    @Expose()
    updatedAt: Date;
}
