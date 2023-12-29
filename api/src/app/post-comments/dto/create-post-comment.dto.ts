import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostCommentDto {
    @ApiProperty({
        description: "Comment's post id",
    })
    @IsNotEmpty()
    @IsInt()
    postId: number;

    @ApiProperty({
        description: "Comment's message",
    })
    @IsOptional()
    @IsString()
    message: string;

    @ApiProperty({
        description: "Comment's parent id",
    })
    @IsOptional()
    @IsInt()
    parentId: number;
}
