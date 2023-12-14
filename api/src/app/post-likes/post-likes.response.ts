import { PickType } from '@nestjs/swagger';

import { PostLikeResponse } from 'src/entities/like/responses/post-like.response';

export class PostLikes_Response extends PickType(PostLikeResponse, [
    'id',
    'postId',
    'authId',
    'createdAt',
    'updatedAt',
]) {}
