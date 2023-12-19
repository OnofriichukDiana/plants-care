import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostComment } from 'src/entities/comment/post-comment.entity';
import { CommentFilesModule } from '../comment-files/comment-files.module';
import { PostCommentsService } from './post-comments.service';
import { PostCommentsController } from './post-comments.controller';

@Module({
    controllers: [PostCommentsController],
    providers: [PostCommentsService],
    imports: [TypeOrmModule.forFeature([PostComment]), CommentFilesModule],
    exports: [PostCommentsService],
})
export class PostCommentsModule {}
