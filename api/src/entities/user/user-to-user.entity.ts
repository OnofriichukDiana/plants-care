import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserToUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subscriberId: number;

    @Column()
    subscriptionId: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    subscriber: User;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    subscription: User;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}
