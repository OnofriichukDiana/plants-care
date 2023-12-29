import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CommentLikeResponse } from 'src/entities/like/responses/comment-like.response';
import { UserResponse } from 'src/entities/user/responses/user.response';
import { User } from 'src/entities/user/user.entity';

export class CommentLikes_Response_Auth extends PickType(UserResponse, [
    'id',
    'name',
    'icon',
    'avatarBackground',
    'avatarUrl',
]) {}

export class CommentLikes_Response extends PickType(CommentLikeResponse, [
    'id',
    'commentId',
    'authId',
    'auth',
    'createdAt',
    'updatedAt',
]) {
    @ApiProperty({
        type: () => CommentLikes_Response_Auth,
    })
    @Type(() => CommentLikes_Response_Auth)
    declare auth: User;
}
