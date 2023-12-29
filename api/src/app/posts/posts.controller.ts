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
import { CreatePostsDto } from './dto/create-post.dto';
import { Posts_Response } from './posts.response';
import { RequestType } from 'src/types';
import { AuthGuard } from '../auth/auth.guard';
import { PostsService } from './posts.service';
import { GetPostsDto } from './dto/get-posts-query.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @ApiOperation({
        description: 'Get all posts',
        summary: 'Get posts',
    })
    @ApiQuery({
        required: false,
        name: 'nameOrTags',
        type: 'string',
    })
    @ApiQuery({
        required: false,
        name: 'subscriberId',
        type: 'string',
    })
    @ApiQuery({
        required: false,
        name: 'userId',
        type: 'string',
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
    findAll(@Query() params: GetPostsDto) {
        return this.postsService.findAll(
            params.page,
            params.limit,
            params.sortBy,
            params.sortOrder,
            params.nameOrTags,
            +params.userId,
            +params.subscriberId,
        );
    }

    @ApiOperation({
        description: 'Get one post by id',
        summary: 'Get post',
    })
    @ApiOkResponse({
        type: Posts_Response,
    })
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postsService.findOne(+id);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: 'Crete',
        description: 'Create post',
    })
    @ApiOkResponse({
        type: Posts_Response,
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() createPostsDto: CreatePostsDto, @Req() req: RequestType) {
        return this.postsService.create(createPostsDto, +req.userId);
    }

    @UseGuards(AuthGuard)
    @ApiOperation({
        description: 'Delete post by id',
        summary: 'Delete post',
    })
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: RequestType) {
        return this.postsService.remove(+id, +req.userId);
    }
}
