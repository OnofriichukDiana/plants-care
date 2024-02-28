import { Module } from '@nestjs/common';
import { ChatGateway } from './chat-messages-gateway';
import { ChatMessagesController } from './chat-messages.controller';
import { ChatMessagesService } from './chat-messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from 'src/entities/chat/chat-message.entity';

@Module({
    controllers: [ChatMessagesController],
    providers: [ChatGateway, ChatMessagesService],
    imports: [TypeOrmModule.forFeature([ChatMessage])],
})
export class ChatMessagesModule {}
