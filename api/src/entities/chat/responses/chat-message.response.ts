import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { getApiPropertyMetadata } from 'src/helpers/getApiPropertyMetadata';
import { ChatMessage } from '../chat-message.entity';
import { User } from 'src/entities/user/user.entity';
import { ChatMessageFile } from 'src/entities/media/chat-message-file.entity';

export class ChatMessageResponse implements ChatMessage {
    @ApiProperty(getApiPropertyMetadata(ChatMessage, 'id'))
    @Expose()
    id: number;

    @ApiProperty(getApiPropertyMetadata(ChatMessage, 'message'))
    @Expose()
    message: string;

    @ApiProperty(getApiPropertyMetadata(ChatMessage, 'isViewed'))
    @Expose()
    isViewed: boolean;

    @ApiProperty(getApiPropertyMetadata(ChatMessage, 'fromUserId'))
    @Expose()
    fromUserId: number;

    @ApiProperty(getApiPropertyMetadata(ChatMessage, 'fromUser'))
    @Expose()
    fromUser: User;

    @ApiProperty(getApiPropertyMetadata(ChatMessage, 'toUserId'))
    @Expose()
    toUserId: number;

    @ApiProperty(getApiPropertyMetadata(ChatMessage, 'toUser'))
    @Expose()
    toUser: User;

    @ApiProperty(getApiPropertyMetadata(ChatMessage, 'chatMessageFiles'))
    @Expose()
    chatMessageFiles: ChatMessageFile[];

    @ApiProperty(getApiPropertyMetadata(ChatMessage, 'createdAt'))
    @Expose()
    createdAt: Date;

    @ApiProperty(getApiPropertyMetadata(ChatMessage, 'updatedAt'))
    @Expose()
    updatedAt: Date;
}
