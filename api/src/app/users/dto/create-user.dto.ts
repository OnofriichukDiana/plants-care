import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        description: 'User`s name',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'User`s email',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'User`s password',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(128)
    password: string;

    @ApiProperty({
        description: 'User`s icon',
    })
    @IsOptional()
    @IsString()
    icon: string;

    @ApiProperty({
        description: 'User`s avatarUrl',
    })
    @IsOptional()
    @IsString()
    avatarUrl: string;
}
