import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaService } from '../media/media.service';
import { MediaType } from '../media/media-type.enum';
import { CommentFile } from 'src/entities/media/comment-file.entity';

@Injectable()
export class CommentFilesService {
    constructor(
        @InjectRepository(CommentFile)
        private readonly commentFilesRepository: Repository<CommentFile>,
        private mediaService: MediaService,
    ) {}

    async create(file: Express.Multer.File, commentId: number) {
        const mediaId = await this.mediaService.upload(
            file,
            MediaType.POST_FILES,
        );
        const commentFile = await this.commentFilesRepository.save({
            mediaId,
            commentId,
        });
        return commentFile;
    }

    async delete(commentFileId: number) {
        const commentFile = await this.commentFilesRepository.findOne({
            where: { id: commentFileId },
        });

        await this.mediaService.remove(commentFile.mediaId);
        await this.commentFilesRepository.delete(commentFile.id);
        return commentFile;
    }
}
