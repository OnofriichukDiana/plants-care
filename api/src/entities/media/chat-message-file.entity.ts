import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ChatMessage } from '../chat/chat-message.entity';
import { Media } from './media.entity';

@Entity()
export class ChatMessageFile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    chatMessageId: number;

    @ManyToOne(() => ChatMessage)
    chatMessage: ChatMessage;

    @Column()
    mediaId: number;

    @ManyToOne(() => Media, { onDelete: 'CASCADE' })
    media: Media;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
