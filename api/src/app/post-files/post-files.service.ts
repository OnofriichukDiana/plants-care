import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostFile } from 'src/entities/media/post-file.entity';
import { MediaService } from '../media/media.service';
import { MediaType } from '../media/media-type.enum';

@Injectable()
export class PostFilesService {
    constructor(
        @InjectRepository(PostFile)
        private readonly postFilesRepository: Repository<PostFile>,
        private mediaService: MediaService,
    ) {}

    async create(file: Express.Multer.File, postId: number) {
        const mediaId = await this.mediaService.upload(
            file,
            MediaType.POST_FILES,
        );
        const postFile = await this.postFilesRepository.save({
            mediaId,
            postId,
        });
        return postFile;
    }

    async delete(postFileId: number) {
        const postFile = await this.postFilesRepository.findOne({
            where: { id: postFileId },
        });

        await this.mediaService.remove(postFile.mediaId);
        await this.postFilesRepository.delete(postFile.id);
        return postFile;
    }
}
