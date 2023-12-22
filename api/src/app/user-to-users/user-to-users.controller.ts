import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    UseGuards,
    Param,
    Get,
    Query,
    Req,
    Delete,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { UserToUsersService } from './user-to-users.service';
import { RequestType } from 'src/types';
import { UserToUsers_Response } from './user-to-users.response';
import { CreateUserToUserDto } from './dto/create-user-to-user.dto';

@Controller('users')
@ApiTags('Users')
export class UserToUsersController {
    constructor(private readonly userToUsersService: UserToUsersService) {}

    // @ApiOperation({
    //     description: 'Get all users',
    //     summary: 'Get users',
    // })
    // @ApiQuery({
    //     required: false,
    //     name: 'nameOrTags',
    //     type: 'string',
    // })
    // @ApiQuery({
    //     required: false,
    //     name: 'page',
    //     type: 'number',
    // })
    // @ApiQuery({
    //     required: false,
    //     name: 'limit',
    //     type: 'number',
    // })
    // @HttpCode(HttpStatus.OK)
    // @Get()
    // findAll(@Query() params: GetUsersDto) {
    //     return this.usersService.findAll(
    //         params.page,
    //         params.limit,
    //         params.nameOrTags,
    //     );
    // }

    @UseGuards(AuthGuard)
    @ApiOperation({
        description: 'is user subscribed',
    })
    @HttpCode(HttpStatus.OK)
    @Get('/is-subscribed')
    async isSubscribed(
        @Param('userId') userId: number,
        @Req() req: RequestType,
    ) {
        return await this.userToUsersService.isSubscribed(userId, +req.userId);
    }

    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: 'Crete',
        description: 'Create user subscriber',
    })
    @ApiOkResponse({
        type: UserToUsers_Response,
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(
        @Body() createUserToUserDto: CreateUserToUserDto,
        @Req() req: RequestType,
    ) {
        return this.userToUsersService.create(createUserToUserDto, +req.userId);
    }

    @UseGuards(AuthGuard)
    @ApiOperation({
        description: 'Unsubscribe',
    })
    @HttpCode(HttpStatus.OK)
    @Delete(':userId')
    async delete(@Param('userId') userId: number, @Req() req: RequestType) {
        return await this.userToUsersService.delete(userId, +req.userId);
    }
}
