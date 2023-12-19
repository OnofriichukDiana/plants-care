import {
    Controller,
    Get,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    Req,
    UseGuards,
    Query,
    Param,
    Delete,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { RequestType } from 'src/types';
import { AuthGuard } from '../auth/auth.guard';
import { GetPostCommentsDto } from './dto/get-post-comments-query.dto';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { PostCommentsService } from './post-comments.service';
import { PostComments_Response } from './post-comments.response';

@Controller('post-comments')
@ApiTags('PostComments')
export class PostCommentsController {
    constructor(private readonly postCommentsService: PostCommentsService) {}

    @ApiOperation({
        description: 'Get all comments for current post',
        summary: 'Get comments for current post',
    })
    @ApiQuery({
        required: true,
        name: 'postId',
        type: 'number',
    })
    @ApiQuery({
        required: false,
        name: 'sortBy',
        enum: ['createdAt'],
    })
    @ApiQuery({
        required: false,
        name: 'sortOrder',
        enum: ['ASC', 'DESC'],
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    findAll(@Query() params: GetPostCommentsDto) {
        return this.postCommentsService.findAll(
            +params.postId,
            params.sortBy,
            params.sortOrder,
        );
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: 'Crete',
        description: 'Create post comment',
    })
    @ApiOkResponse({
        type: PostComments_Response,
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(
        @Body() createPostCommentsDto: CreatePostCommentDto,
        @Req() req: RequestType,
    ) {
        return this.postCommentsService.create(
            createPostCommentsDto,
            +req.userId,
        );
    }

    @UseGuards(AuthGuard)
    @ApiOperation({
        description: 'Delete post comment by id',
        summary: 'Delete post comment',
    })
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: RequestType) {
        return this.postCommentsService.remove(+id, +req.userId);
    }
}
