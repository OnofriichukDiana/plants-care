import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CreatePostsDto {
    @ApiProperty({
        description: "Post's tags",
    })
    @IsNotEmpty()
    @IsArray()
    tags: string[];
}
