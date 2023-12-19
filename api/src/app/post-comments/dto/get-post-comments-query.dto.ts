import {
    IsOptional,
    IsIn,
    IsString,
    IsArray,
    IsNotEmpty,
    IsInt,
} from 'class-validator';

export class GetPostCommentsDto {
    @IsString()
    @IsNotEmpty()
    postId: string;

    @IsOptional()
    @IsIn(['createdAt'])
    sortBy: string;

    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    sortOrder: 'ASC' | 'DESC';
}
