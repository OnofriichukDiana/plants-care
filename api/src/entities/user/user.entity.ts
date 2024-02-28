import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { PostLike } from '../like/post-like.entity';
import { PostComment } from '../comment/post-comment.entity';
import { UserToUser } from './user-to-user.entity';
import { ChatMessage } from '../chat/chat-message.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    password: string;

    @Column({ nullable: true })
    avatarUrl: string;

    @Column({ nullable: true })
    icon: string;

    @Column({ nullable: true })
    avatarBackground: string;

    @Column({ default: 0 })
    countSubscribers: number;

    @Column({ default: 0 })
    countSubscriptions: number;

    @OneToMany(() => UserToUser, ({ subscriber }) => subscriber)
    subscribers: UserToUser[];

    @OneToMany(() => UserToUser, ({ subscription }) => subscription)
    subscriptions: UserToUser[];

    @OneToMany(() => Post, ({ user }) => user)
    posts: Post[];

    @OneToMany(() => ChatMessage, ({ fromUser }) => fromUser)
    chatMessagesFrom: ChatMessage[];

    @OneToMany(() => ChatMessage, ({ toUser }) => toUser)
    chatMessagesTo: ChatMessage[];

    @OneToMany(() => PostLike, ({ auth }) => auth)
    postLikes: PostLike[];

    @OneToMany(() => PostComment, ({ auth }) => auth)
    postComments: PostComment[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
