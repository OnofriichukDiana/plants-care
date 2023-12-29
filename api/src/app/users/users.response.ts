import { PickType } from '@nestjs/swagger';
import { UserResponse } from 'src/entities/user/responses/user.response';

export class Users_Response extends PickType(UserResponse, [
    'id',
    'name',
    'email',
    'icon',
    'avatarUrl',
    'countSubscribers',
    'countSubscriptions',
    'avatarBackground',
    'createdAt',
    'updatedAt',
]) {}
