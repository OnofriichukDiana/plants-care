import { IsOptional, IsIn, IsString, IsArray } from 'class-validator';

export class GetChatMessagesDto {
    @IsString()
    @IsOptional()
    user: string;

    @IsString()
    @IsOptional()
    page: string;

    @IsString()
    @IsOptional()
    limit: string;

    @IsString()
    @IsOptional()
    participantId: string;
}
