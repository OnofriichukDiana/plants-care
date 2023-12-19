import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentLikesController } from './comment-likes.controller';
import { CommentLikesService } from './comment-likes.service';
import { CommentLike } from 'src/entities/like/comment-like.entity';

@Module({
    controllers: [CommentLikesController],
    providers: [CommentLikesService],
    imports: [TypeOrmModule.forFeature([CommentLike])],
})
export class CommentLikesModule {}
