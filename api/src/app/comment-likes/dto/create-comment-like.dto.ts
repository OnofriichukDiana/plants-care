import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateCommentLikesDto {
    @ApiProperty({
        description: "Comment like's post id",
    })
    @IsNotEmpty()
    @IsInt()
    commentId: number;
}
