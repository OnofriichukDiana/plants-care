import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PostLikeResponse } from 'src/entities/like/responses/post-like.response';
import { UserResponse } from 'src/entities/user/responses/user.response';
import { User } from 'src/entities/user/user.entity';

export class PostLikes_Response_Auth extends PickType(UserResponse, [
    'id',
    'name',
    'icon',
    'avatarBackground',
    'avatarUrl',
]) {}

export class PostLikes_Response extends PickType(PostLikeResponse, [
    'id',
    'postId',
    'authId',
    'auth',
    'createdAt',
    'updatedAt',
]) {
    @ApiProperty({
        type: () => PostLikes_Response_Auth,
    })
    @Type(() => PostLikes_Response_Auth)
    declare auth: User;
}
