import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateChatMessagesDto {
    @ApiProperty({
        description: "Chat messsage's messaage",
    })
    @IsOptional()
    @IsString()
    message: string;

    @ApiProperty({
        description: "Chat messsage's isViewed",
    })
    @IsOptional()
    @IsBoolean()
    isViewed: boolean;

    @ApiProperty({
        description: "Chat messsage's toUserId",
    })
    @IsNotEmpty()
    @IsInt()
    toUserId: number;
}
