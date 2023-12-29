import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UserToUserResponse } from 'src/entities/user/responses/user-to-user.response';
import { UserResponse } from 'src/entities/user/responses/user.response';
import { User } from 'src/entities/user/user.entity';

export class UserToUsers_Response_User extends PickType(UserResponse, [
    'id',
    'name',
    'icon',
    'avatarBackground',
    'avatarUrl',
]) {}

export class UserToUsers_Response extends PickType(UserToUserResponse, [
    'id',
    'subscriberId',
    'subscriptionId',
    'subscriber',
    'subscription',
    'createdAt',
]) {
    @ApiProperty({
        type: () => UserToUsers_Response_User,
    })
    @Type(() => UserToUsers_Response_User)
    declare subscriber: User;

    @ApiProperty({
        type: () => UserToUsers_Response_User,
    })
    @Type(() => UserToUsers_Response_User)
    declare subscription: User;
}
