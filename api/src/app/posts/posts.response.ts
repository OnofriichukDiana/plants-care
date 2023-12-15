import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PostComment } from 'src/entities/comment/post-comment.entity';
import { PostCommentResponse } from 'src/entities/comment/responses/post-comment.response';
import { PostLike } from 'src/entities/like/post-like.entity';
import { PostLikeResponse } from 'src/entities/like/responses/post-like.response';
import { CommentFile } from 'src/entities/media/comment-file.entity';
import { Media } from 'src/entities/media/media.entity';
import { PostFile } from 'src/entities/media/post-file.entity';
import { CommentFileResponse } from 'src/entities/media/responses/comment-file.response';
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

export class Comments_Response_Files extends PickType(CommentFileResponse, [
    'id',
    'media',
]) {
    @ApiProperty({
        type: () => Files_Response_Media,
    })
    @Type(() => Files_Response_Media)
    declare media: Media;
}

export class Posts_Response_Comments extends PickType(PostCommentResponse, [
    'id',
    'message',
    'auth',
    'commentFiles',
]) {
    @ApiProperty({
        type: () => Comments_Response_Files,
    })
    @Type(() => Comments_Response_Files)
    declare commentFiles: CommentFile[];

    @ApiProperty({
        type: () => Posts_Response_User,
    })
    @Type(() => Posts_Response_User)
    declare auth: User;
}

export class Posts_Response_Likes extends PickType(PostLikeResponse, [
    'id',
    'auth',
]) {
    @ApiProperty({
        type: () => Posts_Response_User,
    })
    @Type(() => Posts_Response_User)
    declare auth: User;
}

export class Posts_Response extends PickType(PostResponse, [
    'id',
    'message',
    'tags',
    'isShowTags',
    'countLikes',
    'countComments',
    'postComments',
    'postLikes',
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

    @ApiProperty({
        type: () => Posts_Response_Comments,
    })
    @Type(() => Posts_Response_Comments)
    declare postComments: PostComment[];

    @ApiProperty({
        type: () => Posts_Response_Likes,
    })
    @Type(() => Posts_Response_Likes)
    declare postLikes: PostLike[];
}
