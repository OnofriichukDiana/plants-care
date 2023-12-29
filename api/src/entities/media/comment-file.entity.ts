import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Media } from './media.entity';
import { PostComment } from '../comment/post-comment.entity';

@Entity()
export class CommentFile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    commentId: number;

    @ManyToOne(() => PostComment, { onDelete: 'CASCADE' })
    comment: PostComment;

    @Column()
    mediaId: number;

    @ManyToOne(() => Media, { onDelete: 'CASCADE' })
    media: Media;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
