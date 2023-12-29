import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from 'src/entities/media/media.entity';

@Module({
    providers: [MediaService],
    imports: [TypeOrmModule.forFeature([Media])],
    exports: [MediaService],
})
export class MediaModule {}
