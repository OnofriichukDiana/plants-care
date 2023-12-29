import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { Media } from 'src/entities/media/media.entity';
import { MediaType } from './media-type.enum';

interface IRes {
    mediaId: number;
    url: string;
}

@Injectable()
export class MediaService {
    private s3;

    constructor(
        @InjectRepository(Media)
        private readonly mediaRepository: Repository<Media>,
        private readonly configService: ConfigService,
    ) {
        this.s3 = new AWS.S3({
            accessKeyId: process.env.B2_APPLICATION_KEY_ID,
            secretAccessKey: process.env.B2_APPLICATION_KEY,
            endpoint: process.env.B2_ENDPOINT,
        });
    }

    async upload(
        data: Express.Multer.File,
        mediaType: MediaType,
    ): Promise<IRes> {
        const Bucket = this.configService.get<string>('B2_BUCKET_NAME');

        const path = `${mediaType}/${data.originalname}`;
        const res = await this.s3
            .upload({
                Bucket,
                Key: path,
                Body: data.buffer,
            })
            .promise();

        const media = await this.mediaRepository.save({
            path: res.Location,
            name: data.originalname,
            size: data.size,
            mime: data.mimetype,
        });
        return { mediaId: media.id, url: media.path };
    }

    async remove(mediaId: number): Promise<void> {
        const Bucket = this.configService.get<string>('B2_BUCKET_NAME');
        const media = await this.mediaRepository.findOneBy({
            id: mediaId,
        });
        if (media) {
            try {
                await this.s3
                    .deleteObject({ Bucket, Key: media.path })
                    .promise();

                await this.mediaRepository.delete(media.id);
                console.log('Successfully deleted from S3');
            } catch (error) {
                console.error('Error deleting object from S3:', error);
                throw new Error('Failed to delete object from S3');
            }
        }
    }

    async findAndRemove(path: string): Promise<void> {
        const Bucket = this.configService.get<string>('B2_BUCKET_NAME');
        const media = await this.mediaRepository.findOneBy({
            path,
        });
        if (media) {
            try {
                await this.s3
                    .deleteObject({ Bucket, Key: media.path })
                    .promise();

                await this.mediaRepository.delete(media.id);
                console.log('Successfully deleted from S3');
            } catch (error) {
                console.error('Error deleting object from S3:', error);
                throw new Error('Failed to delete object from S3');
            }
        }
    }
}
