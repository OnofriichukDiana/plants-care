import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { PostFile } from './post-file.entity';
import { CommentFile } from './comment-file.entity';
import { ChatMessageFile } from './chat-message-file.entity';

@Entity()
export class Media {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    path: string;

    @Column({ type: 'text' })
    name: string;

    @Column()
    size: number;

    @Column({ type: 'text', nullable: true })
    mime: string;

    @OneToMany(() => PostFile, ({ media }) => media)
    postFiles: PostFile[];

    @OneToMany(() => CommentFile, ({ media }) => media)
    commentFiles: CommentFile[];

    @OneToMany(() => ChatMessageFile, ({ media }) => media)
    chatMessageFiles: ChatMessageFile[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
