import {
    Controller,
    Get,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    Req,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Param,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiConsumes,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { PostFiles_Response } from './post-files.response';
import { RequestType } from 'src/types';
import { AuthGuard } from '../auth/auth.guard';
import { PostFilesService } from './post-files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('post-files')
@ApiTags('PostFiles')
export class PostFilesController {
    constructor(private readonly postFilesService: PostFilesService) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: 'Crete',
        description: 'Create post file',
    })
    @ApiOkResponse({
        type: PostFiles_Response,
    })
    @ApiConsumes('multipart/form-data')
    @HttpCode(HttpStatus.CREATED)
    @Post(':postId')
    @UseInterceptors(FileInterceptor('file'))
    create(
        @Req() req: RequestType,
        @UploadedFile() file: Express.Multer.File,
        @Param('postId') postId: number,
    ) {
        return this.postFilesService.create(file, +postId);
    }
}
