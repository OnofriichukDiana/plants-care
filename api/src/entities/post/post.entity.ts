import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { PostFile } from '../media/post-file.entity';
import { PostLike } from '../like/post-like.entity';
import { PostComment } from '../comment/post-comment.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: true })
    message: string;

    @Column({ default: 0 })
    countLikes: number;

    @Column({ default: 0 })
    countComments: number;

    @Column({ type: 'boolean', default: false })
    isShowTags: boolean;

    @Column({ type: 'text', array: true })
    tags: string[];

    @Column()
    userId: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => PostFile, ({ post }) => post)
    postFiles: PostFile[];

    @OneToMany(() => PostLike, ({ post }) => post)
    postLikes: PostLike[];

    @OneToMany(() => PostComment, ({ post }) => post)
    postComments: PostComment[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
