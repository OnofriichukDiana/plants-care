import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CommentFile } from 'src/entities/media/comment-file.entity';
import { Media } from 'src/entities/media/media.entity';

export class CommentFiles_Response_Media extends PickType(Media, [
    'id',
    'path',
    'size',
    'name',
    'mime',
]) {}

export class CommentFiles_Response extends PickType(CommentFile, [
    'id',
    'media',
    'createdAt',
    'updatedAt',
]) {
    @ApiProperty({
        type: () => CommentFiles_Response_Media,
    })
    @Type(() => CommentFiles_Response_Media)
    declare media: Media;
}
