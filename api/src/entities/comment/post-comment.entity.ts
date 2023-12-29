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
import { Post } from '../post/post.entity';
import { CommentFile } from '../media/comment-file.entity';
import { CommentLike } from '../like/comment-like.entity';

@Entity()
export class PostComment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: true })
    message: string;

    @Column()
    postId: number;

    @Column({ default: 0 })
    countLikes: number;

    @ManyToOne(() => Post, { onDelete: 'CASCADE' })
    post: Post;

    @Column()
    authId: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    auth: User;

    @Column({ nullable: true })
    parentId: number;

    @ManyToOne(() => PostComment, { onDelete: 'CASCADE' })
    parent: PostComment;

    @OneToMany(() => PostComment, ({ parent }) => parent)
    children: PostComment[];

    @OneToMany(() => CommentFile, ({ comment }) => comment)
    commentFiles: CommentFile[];

    @OneToMany(() => CommentLike, ({ comment }) => comment)
    commentLikes: CommentLike[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
