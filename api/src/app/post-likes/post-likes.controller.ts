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
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostLikesDto } from './dto/create-post-like.dto';
import { PostLikes_Response } from './post-likes.response';
import { RequestType } from 'src/types';
import { AuthGuard } from '../auth/auth.guard';
import { PostLikesService } from './post-likes.service';

@Controller('post-likes')
@ApiTags('PostLikes')
export class PostLikesController {
    constructor(private readonly postLikesService: PostLikesService) {}
    @UseGuards(AuthGuard)
    @ApiOperation({
        description: 'is post liked',
    })
    @HttpCode(HttpStatus.OK)
    @Get(':postId/is-liked')
    async isLiked(@Param('postId') postId: number, @Req() req: RequestType) {
        return await this.postLikesService.isLiked(postId, +req.userId);
    }

    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: 'Crete',
        description: 'Create post like',
    })
    @ApiOkResponse({
        type: PostLikes_Response,
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(
        @Body() createPostLikesDto: CreatePostLikesDto,
        @Req() req: RequestType,
    ) {
        return this.postLikesService.create(createPostLikesDto, +req.userId);
    }

    @UseGuards(AuthGuard)
    @ApiOperation({
        description: 'Eliminate like',
    })
    @HttpCode(HttpStatus.OK)
    @Delete(':postId')
    async delete(@Param('postId') postId: number, @Req() req: RequestType) {
        return await this.postLikesService.delete(postId, +req.userId);
    }
}
