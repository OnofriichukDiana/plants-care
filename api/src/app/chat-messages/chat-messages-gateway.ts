import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@WebSocketGateway({ cors: '*' })
export class ChatGateway implements OnGatewayConnection {
    @WebSocketServer() server: Server;

    @UseGuards(AuthGuard)
    handleConnection(client: Socket) {
        const userId = client.handshake.query.userId?.toString();
        console.log(`User connected: ${userId}`);
        client.join(userId);
    }

    @SubscribeMessage('chat-message-added')
    async handleMessage(chatMessage: any) {
        console.log(
            `Client ${chatMessage?.fromUserId} sended message: ${chatMessage.message} to: ${chatMessage.toUserId}`,
        );
        this.server
            .to(`${chatMessage.toUserId.toString()}`)
            .emit('chat-message-added', chatMessage);
    }

    @SubscribeMessage('chat-message-viewed')
    async handleMarkViewed(fromUserId: number, toUserId: number) {
        this.server
            .to(`${fromUserId.toString()}`)
            .emit('chat-message-viewed', toUserId);
    }
}
