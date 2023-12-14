import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class Auth_LoginDto {
    @ApiProperty({
        description: "User's email",
    })
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        description: "User's password",
        minLength: 6,
        maxLength: 128,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(128)
    readonly password: string;
}
