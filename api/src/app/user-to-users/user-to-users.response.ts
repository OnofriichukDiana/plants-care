import { PickType } from '@nestjs/swagger';
import { UserToUserResponse } from 'src/entities/user/responses/user-to-user.response';

export class UserToUsers_Response extends PickType(UserToUserResponse, [
    'id',
    'subscriberId',
    'subscriptionId',
    'createdAt',
]) {}
