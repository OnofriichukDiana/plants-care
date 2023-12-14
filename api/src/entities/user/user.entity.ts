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

    @OneToMany(() => Post, ({ user }) => user)
    posts: Post[];

    @OneToMany(() => PostLike, ({ auth }) => auth)
    postLikes: PostLike[];

    @OneToMany(() => PostComment, ({ auth }) => auth)
    postComments: PostComment[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
