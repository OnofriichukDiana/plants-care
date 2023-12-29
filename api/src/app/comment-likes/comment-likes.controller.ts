import {
    Controller,
    Get,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    Req,
    UseGuards,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import {
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { RequestType } from 'src/types';
import { AuthGuard } from '../auth/auth.guard';
import { CommentLikesService } from './comment-likes.service';
import { GetCommentLikesDto } from './dto/get-comment-likes-query.dto';
import { CommentLikes_Response } from './comment-likes.response';
import { CreateCommentLikesDto } from './dto/create-comment-like.dto';

@Controller('comment-likes')
@ApiTags('CommentLikes')
export class CommentLikesController {
    constructor(private readonly commentLikesService: CommentLikesService) {}

    @ApiOperation({
        description: 'Get all likes for current comment',
        summary: 'Get comment likes',
    })
    @ApiQuery({
        required: true,
        name: 'commentId',
        type: 'number',
    })
    @ApiQuery({
        required: false,
        name: 'page',
        type: 'number',
    })
    @ApiQuery({
        required: false,
        name: 'limit',
        type: 'number',
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    findAll(@Query() params: GetCommentLikesDto) {
        return this.commentLikesService.findAll(
            params.commentId,
            params.page,
            params.limit,
        );
    }

    @UseGuards(AuthGuard)
    @ApiOperation({
        description: 'is comment liked',
    })
    @HttpCode(HttpStatus.OK)
    @Get(':commentId/is-liked')
    async isLiked(
        @Param('commentId') commentId: number,
        @Req() req: RequestType,
    ) {
        return await this.commentLikesService.isLiked(commentId, +req.userId);
    }

    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: 'Crete',
        description: 'Create comment like',
    })
    @ApiOkResponse({
        type: CommentLikes_Response,
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(
        @Body() createCommentLikesDto: CreateCommentLikesDto,
        @Req() req: RequestType,
    ) {
        return this.commentLikesService.create(
            createCommentLikesDto,
            +req.userId,
        );
    }

    @UseGuards(AuthGuard)
    @ApiOperation({
        description: 'Eliminate like',
    })
    @HttpCode(HttpStatus.OK)
    @Delete(':commentId')
    async delete(
        @Param('commentId') commentId: number,
        @Req() req: RequestType,
    ) {
        return await this.commentLikesService.delete(commentId, +req.userId);
    }
}
