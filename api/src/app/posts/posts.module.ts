import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from 'src/entities/post/post.entity';

@Module({
    controllers: [PostsController],
    providers: [PostsService],
    imports: [TypeOrmModule.forFeature([Post])],
})
export class PostsModule {}
