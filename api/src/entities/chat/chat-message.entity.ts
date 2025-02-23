import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ChatMessageFile } from '../media/chat-message-file.entity';
import { User } from '../user/user.entity';

@Entity()
export class ChatMessage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: true })
    message: string;

    @Column({ type: 'boolean', default: false })
    isViewed: boolean;

    @Column()
    fromUserId: number;

    @ManyToOne(() => User)
    fromUser: User;

    @Column()
    toUserId: number;

    @ManyToOne(() => User)
    toUser: User;

    @OneToMany(() => ChatMessageFile, ({ chatMessage }) => chatMessage, {
        cascade: ['insert'],
    })
    chatMessageFiles: ChatMessageFile[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
