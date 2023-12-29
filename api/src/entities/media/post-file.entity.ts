import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Media } from './media.entity';
import { Post } from '../post/post.entity';

@Entity()
export class PostFile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    postId: number;

    @Column()
    mediaId: number;

    @ManyToOne(() => Media, { onDelete: 'CASCADE' })
    media: Media;

    @ManyToOne(() => Post, { onDelete: 'CASCADE' })
    post: Post;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
