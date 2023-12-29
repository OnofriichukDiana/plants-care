import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetPostLikesDto {
    @IsNotEmpty()
    @IsString()
    postId: string;

    @IsString()
    @IsOptional()
    page: string;

    @IsString()
    @IsOptional()
    limit: string;
}
