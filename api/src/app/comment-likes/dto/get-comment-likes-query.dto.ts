import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetCommentLikesDto {
    @IsNotEmpty()
    @IsString()
    commentId: string;

    @IsString()
    @IsOptional()
    page: string;

    @IsString()
    @IsOptional()
    limit: string;
}
