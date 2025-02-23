import { getApiPropertyMetadata } from 'src/helpers/getApiPropertyMetadata';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { User } from '../user.entity';
import { PostLike } from 'src/entities/like/post-like.entity';
import { PostComment } from 'src/entities/comment/post-comment.entity';
import { Post } from 'src/entities/post/post.entity';
import { UserToUser } from '../user-to-user.entity';
import { ChatMessage } from 'src/entities/chat/chat-message.entity';

export class UserResponse implements User {
    @ApiProperty(getApiPropertyMetadata(User, 'id'))
    @Expose()
    id: number;

    @ApiProperty(getApiPropertyMetadata(User, 'email'))
    @Expose()
    email: string;

    @ApiProperty(getApiPropertyMetadata(User, 'name'))
    @Expose()
    name: string;

    @ApiProperty(getApiPropertyMetadata(User, 'password'))
    @Expose()
    password: string;

    @ApiProperty(getApiPropertyMetadata(User, 'avatarUrl'))
    @Expose()
    avatarUrl: string;

    @ApiProperty(getApiPropertyMetadata(User, 'avatarBackground'))
    @Expose()
    avatarBackground: string;

    @ApiProperty(getApiPropertyMetadata(User, 'icon'))
    @Expose()
    icon: string;

    @ApiProperty(getApiPropertyMetadata(User, 'countSubscribers'))
    @Expose()
    countSubscribers: number;

    @ApiProperty(getApiPropertyMetadata(User, 'countSubscriptions'))
    @Expose()
    countSubscriptions: number;

    @ApiProperty(getApiPropertyMetadata(User, 'subscribers'))
    @Expose()
    subscribers: UserToUser[];

    @ApiProperty(getApiPropertyMetadata(User, 'subscriptions'))
    @Expose()
    subscriptions: UserToUser[];

    @ApiProperty(getApiPropertyMetadata(User, 'chatMessagesFrom'))
    @Expose()
    chatMessagesFrom: ChatMessage[];

    @ApiProperty(getApiPropertyMetadata(User, 'chatMessagesTo'))
    @Expose()
    chatMessagesTo: ChatMessage[];

    @ApiProperty(getApiPropertyMetadata(User, 'posts'))
    @Expose()
    posts: Post[];

    @ApiProperty(getApiPropertyMetadata(User, 'postLikes'))
    @Expose()
    postLikes: PostLike[];

    @ApiProperty(getApiPropertyMetadata(User, 'postComments'))
    @Expose()
    postComments: PostComment[];

    @ApiProperty(getApiPropertyMetadata(User, 'createdAt'))
    @Expose()
    createdAt: Date;

    @ApiProperty(getApiPropertyMetadata(User, 'updatedAt'))
    @Expose()
    updatedAt: Date;
}
