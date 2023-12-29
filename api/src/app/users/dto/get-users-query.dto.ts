import { IsOptional, IsString } from 'class-validator';

export class GetUsersDto {
    @IsString()
    @IsOptional()
    nameOrTags: string;

    @IsString()
    @IsOptional()
    page: string;

    @IsString()
    @IsOptional()
    limit: string;
}
