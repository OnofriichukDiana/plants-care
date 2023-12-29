import {
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    Req,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Param,
} from '@nestjs/common';
import {
    ApiConsumes,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { CommentFiles_Response } from './comment-files.response';
import { RequestType } from 'src/types';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommentFilesService } from './comment-files.service';

@Controller('comment-files')
@ApiTags('CommentFiles')
export class CommentFilesController {
    constructor(private readonly commentFilesService: CommentFilesService) {}

    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: 'Crete',
        description: 'Create comment file',
    })
    @ApiOkResponse({
        type: CommentFiles_Response,
    })
    @ApiConsumes('multipart/form-data')
    @HttpCode(HttpStatus.CREATED)
    @Post(':commentId')
    @UseInterceptors(FileInterceptor('file'))
    create(
        @Req() req: RequestType,
        @UploadedFile() file: Express.Multer.File,
        @Param('commentId') commentId: number,
    ) {
        return this.commentFilesService.create(file, +commentId);
    }
}
