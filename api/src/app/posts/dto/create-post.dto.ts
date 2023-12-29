import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostsDto {
    @ApiProperty({
        description: "Post's tags",
    })
    @IsNotEmpty()
    @IsArray()
    tags: string[];

    @ApiProperty({
        description: "Post's messaage",
    })
    @IsOptional()
    @IsString()
    message: string;
}
