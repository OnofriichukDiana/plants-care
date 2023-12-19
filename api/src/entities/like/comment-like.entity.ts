import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { PostComment } from '../comment/post-comment.entity';

@Entity()
export class CommentLike {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    commentId: number;

    @Column()
    authId: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    auth: User;

    @ManyToOne(() => PostComment, { onDelete: 'CASCADE' })
    comment: PostComment;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
