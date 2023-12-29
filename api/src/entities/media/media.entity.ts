import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { PostFile } from './post-file.entity';
import { CommentFile } from './comment-file.entity';

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

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
