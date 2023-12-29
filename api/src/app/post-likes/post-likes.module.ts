import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostLikesController } from './post-likes.controller';
import { PostLikesService } from './post-likes.service';
import { Post } from 'src/entities/post/post.entity';
import { PostLike } from 'src/entities/like/post-like.entity';

@Module({
    controllers: [PostLikesController],
    providers: [PostLikesService],
    imports: [TypeOrmModule.forFeature([PostLike])],
})
export class PostLikesModule {}
