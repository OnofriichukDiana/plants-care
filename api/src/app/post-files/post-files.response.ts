import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Media } from 'src/entities/media/media.entity';
import { PostFile } from 'src/entities/media/post-file.entity';

export class PostFiles_Response_Media extends PickType(Media, [
    'id',
    'path',
    'size',
    'name',
]) {}

export class PostFiles_Response extends PickType(PostFile, [
    'id',
    'media',
    'createdAt',
    'updatedAt',
]) {
    @ApiProperty({
        type: () => PostFiles_Response_Media,
    })
    @Type(() => PostFiles_Response_Media)
    declare media: Media;
}
