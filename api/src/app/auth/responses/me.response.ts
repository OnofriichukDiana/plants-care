import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserResponse } from 'src/entities/user/responses/user.response';

export class MeResponse extends PickType(UserResponse, [
    'id',
    'name',
    'email',
    'icon',
    'avatarUrl',
    'countSubscriptions',
    'avatarBackground',
    'createdAt',
    'updatedAt',
]) {}

export class Auth_MeResponse {
    @ApiProperty({
        description: 'me',
    })
    @Expose()
    me: MeResponse;
}
