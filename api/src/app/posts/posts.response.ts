import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Media } from 'src/entities/media/media.entity';
import { PostFile } from 'src/entities/media/post-file.entity';
import { MediaResponse } from 'src/entities/media/responses/media.response';
import { PostFileResponse } from 'src/entities/media/responses/post-file.response';
import { PostResponse } from 'src/entities/post/responses/post.response';
import { UserResponse } from 'src/entities/user/responses/user.response';
import { User } from 'src/entities/user/user.entity';

export class Posts_Response_User extends PickType(UserResponse, [
    'id',
    'name',
    'icon',
    'avatarBackground',
    'avatarUrl',
]) {}

export class Files_Response_Media extends PickType(MediaResponse, ['path']) {}

export class Posts_Response_Files extends PickType(PostFileResponse, [
    'id',
    'media',
]) {
    @ApiProperty({
        type: () => Files_Response_Media,
    })
    @Type(() => Files_Response_Media)
    declare media: Media;
}

export class Posts_Response extends PickType(PostResponse, [
    'id',
    'message',
    'tags',
    'isShowTags',
    'countLikes',
    'countComments',
    'user',
    'postFiles',
    'createdAt',
    'updatedAt',
]) {
    @ApiProperty({
        type: () => Posts_Response_Files,
    })
    @Type(() => Posts_Response_Files)
    declare postFiles: PostFile[];

    @ApiProperty({
        type: () => Posts_Response_User,
    })
    @Type(() => Posts_Response_User)
    declare user: User;
}
