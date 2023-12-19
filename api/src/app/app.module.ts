import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dbConf } from '../config';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { MediaModule } from './media/media.module';
import { PostFilesModule } from './post-files/post-files.module';
import { UserModule } from './user/user.module';
import { PostLikesModule } from './post-likes/post-likes.module';
import { PostCommentsModule } from './post-comments/post-comments.module';
import { CommentFilesModule } from './comment-files/comment-files.module';
import { CommentLikesModule } from './comment-likes/comment-likes.module';

@Module({
    imports: [
        AuthModule,
        UserModule,
        MediaModule,
        PostsModule,
        PostFilesModule,
        PostLikesModule,
        PostCommentsModule,
        CommentFilesModule,
        CommentLikesModule,
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
