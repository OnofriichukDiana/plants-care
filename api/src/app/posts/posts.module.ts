import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from 'src/entities/post/post.entity';
import { PostFilesModule } from '../post-files/post-files.module';
import { PostCommentsModule } from '../post-comments/post-comments.module';

@Module({
    controllers: [PostsController],
    providers: [PostsService],
    imports: [
        TypeOrmModule.forFeature([Post]),
        PostFilesModule,
        PostCommentsModule,
    ],
})
export class PostsModule {}
