import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaModule } from '../media/media.module';
import { CommentFilesService } from './comment-files.service';
import { CommentFile } from 'src/entities/media/comment-file.entity';
import { CommentFilesController } from './comment-files.controller';

@Module({
    controllers: [CommentFilesController],
    providers: [CommentFilesService],
    imports: [TypeOrmModule.forFeature([CommentFile]), MediaModule],
    exports: [CommentFilesService],
})
export class CommentFilesModule {}
