import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PostCommentResponse } from 'src/entities/comment/responses/post-comment.response';
import { CommentFile } from 'src/entities/media/comment-file.entity';
import { Media } from 'src/entities/media/media.entity';
import { CommentFileResponse } from 'src/entities/media/responses/comment-file.response';
import { MediaResponse } from 'src/entities/media/responses/media.response';
import { UserResponse } from 'src/entities/user/responses/user.response';
import { User } from 'src/entities/user/user.entity';

export class PostComments_Response_Auth extends PickType(UserResponse, [
    'id',
    'name',
    'icon',
    'avatarBackground',
    'avatarUrl',
]) {}

export class Files_Response_Media extends PickType(MediaResponse, [
    'id',
    'path',
    'size',
    'name',
    'mime',
]) {}

export class PostComments_Response_Files extends PickType(CommentFileResponse, [
    'id',
    'media',
]) {
    @ApiProperty({
        type: () => Files_Response_Media,
    })
    @Type(() => Files_Response_Media)
    declare media: Media;
}

export class PostComments_Response extends PickType(PostCommentResponse, [
    'id',
    'message',
    'auth',
    'countLikes',
    'commentFiles',
    'createdAt',
    'updatedAt',
    'parentId',
]) {
    @ApiProperty({
        type: () => PostComments_Response_Files,
    })
    @Type(() => PostComments_Response_Files)
    declare commentFiles: CommentFile[];

    @ApiProperty({
        type: () => PostComments_Response_Auth,
    })
    @Type(() => PostComments_Response_Auth)
    declare auth: User;
}
