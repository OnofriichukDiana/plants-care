import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dbConf } from '../config';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { MediaModule } from './media/media.module';
import { PostFilesModule } from './post-files/post-files.module';
import { UsersModule } from './users/users.module';
import { PostLikesModule } from './post-likes/post-likes.module';
import { PostCommentsModule } from './post-comments/post-comments.module';
import { CommentFilesModule } from './comment-files/comment-files.module';
import { CommentLikesModule } from './comment-likes/comment-likes.module';
import { UserToUsersModule } from './user-to-users/user-to-users.module';
import { ChatMessagesModule } from './chat-messages/chat-messages.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        MediaModule,
        PostsModule,
        PostFilesModule,
        PostLikesModule,
        PostCommentsModule,
        CommentFilesModule,
        CommentLikesModule,
        UserToUsersModule,
        ChatMessagesModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [dbConf],
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
                configService.get('typeorm'),
        }),
    ],
})
export class AppModule {}
