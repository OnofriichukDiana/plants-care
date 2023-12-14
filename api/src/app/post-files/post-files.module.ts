import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostFilesController } from './post-files.controller';
import { PostFilesService } from './post-files.service';
import { MediaModule } from '../media/media.module';
import { PostFile } from 'src/entities/media/post-file.entity';

@Module({
    controllers: [PostFilesController],
    providers: [PostFilesService],
    imports: [TypeOrmModule.forFeature([PostFile]), MediaModule],
})
export class PostFilesModule {}
