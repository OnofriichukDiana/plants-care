import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { MeResponse } from './me.response';

export class Auth_SignInResponse {
    @ApiProperty({
        description: 'JWT access token',
    })
    @Expose()
    token: string;

    @ApiProperty({
        description: 'me',
    })
    @Expose()
    me: MeResponse;
}
