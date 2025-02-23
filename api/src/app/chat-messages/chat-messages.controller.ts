import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { ChatMessagesService } from './chat-messages.service';
import { AuthGuard } from '../auth/auth.guard';
import { ChatMessages_Response } from './chat-messages.response';
import { CreateChatMessagesDto } from './dto/create.dto';
import { RequestType } from 'src/types';
import { GetChatMessagesDto } from './dto/get-query.dto';

@Controller('chat-messages')
@ApiTags('ChatMessages')
export class ChatMessagesController {
    constructor(private readonly chatMessagesService: ChatMessagesService) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({
        description: 'Get all available chats',
        summary: 'Get chats',
    })
    @ApiQuery({
        required: false,
        name: 'user',
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
        name: 'participantId',
        type: 'number',
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    findAll(@Query() params: GetChatMessagesDto, @Req() req: RequestType) {
        return this.chatMessagesService.findAll(
            params.page,
            params.limit,
            params.user,
            +params.participantId,
            +req.userId,
        );
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({
        description: 'Get number of unreaded chats',
        summary: 'count unreaded chats',
    })
    @HttpCode(HttpStatus.OK)
    @Get('/count-unreaded-messages')
    countUnreaded(@Req() req: RequestType) {
        return this.chatMessagesService.countUnreaded(+req.userId);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: 'Crete',
        description: 'Create chat message',
    })
    @ApiOkResponse({
        type: ChatMessages_Response,
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(
        @Body() createChatMessagesDto: CreateChatMessagesDto,
        @Req() req: RequestType,
    ) {
        return this.chatMessagesService.create(
            createChatMessagesDto,
            +req.userId,
        );
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({
        description: 'set viewed messages',
    })
    @ApiOkResponse()
    @HttpCode(HttpStatus.OK)
    @Patch('/set-viewed')
    setViewed(@Body() dto: { participantId: string }, @Req() req: RequestType) {
        return this.chatMessagesService.setViewed(+req.userId, dto);
    }
}
