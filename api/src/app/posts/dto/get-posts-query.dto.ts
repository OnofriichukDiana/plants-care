import { IsOptional, IsIn, IsString, IsArray } from 'class-validator';

export class GetPostsDto {
    @IsString()
    @IsOptional()
    nameOrTags: string;

    @IsString()
    @IsOptional()
    page: string;

    @IsString()
    @IsOptional()
    limit: string;

    @IsOptional()
    @IsIn(['createdAt'])
    sortBy: string;

    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    sortOrder: 'ASC' | 'DESC';
}
