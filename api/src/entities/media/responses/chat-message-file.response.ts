import { getApiPropertyMetadata } from 'src/helpers/getApiPropertyMetadata';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ChatMessageFile } from '../chat-message-file.entity';
import { ChatMessage } from 'src/entities/chat/chat-message.entity';
import { Media } from '../media.entity';

export class ChatMessageFileResponse implements ChatMessageFile {
    @ApiProperty(getApiPropertyMetadata(ChatMessageFile, 'id'))
    @Expose()
    id: number;

    @ApiProperty(getApiPropertyMetadata(ChatMessageFile, 'chatMessageId'))
    @Expose()
    chatMessageId: number;

    @ApiProperty(getApiPropertyMetadata(ChatMessageFile, 'chatMessage'))
    @Expose()
    chatMessage: ChatMessage;

    @ApiProperty(getApiPropertyMetadata(ChatMessageFile, 'mediaId'))
    @Expose()
    mediaId: number;

    @ApiProperty(getApiPropertyMetadata(ChatMessageFile, 'media'))
    @Expose()
    media: Media;

    @ApiProperty(getApiPropertyMetadata(ChatMessageFile, 'createdAt'))
    @Expose()
    createdAt: Date;

    @ApiProperty(getApiPropertyMetadata(ChatMessageFile, 'updatedAt'))
    @Expose()
    updatedAt: Date;
}
