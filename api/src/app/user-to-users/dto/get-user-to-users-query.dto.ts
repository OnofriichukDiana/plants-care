import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetUserToUsersDto {
    @IsOptional()
    @IsString()
    subscriberId: string;

    @IsOptional()
    @IsString()
    subscriptionId: string;

    @IsString()
    @IsOptional()
    page: string;

    @IsString()
    @IsOptional()
    limit: string;
}
