import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreatePostLikesDto {
    @ApiProperty({
        description: "Post like's post id",
    })
    @IsNotEmpty()
    @IsInt()
    postId: number;
}
