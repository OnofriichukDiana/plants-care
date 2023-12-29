import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePasswordDto {
    @ApiProperty({
        description: 'User`s old password',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(128)
    oldPassword: string;

    @ApiProperty({
        description: 'User`s old password',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(128)
    newPassword: string;
}
