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
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Users_Response } from './users.response';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { GetUsersDto } from './dto/get-users-query.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({
        description: 'Get all users',
        summary: 'Get users',
    })
    @ApiQuery({
        required: false,
        name: 'nameOrTags',
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
    @HttpCode(HttpStatus.OK)
    @Get()
    findAll(@Query() params: GetUsersDto) {
        return this.usersService.findAll(
            params.page,
            params.limit,
            params.nameOrTags,
        );
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({
        description: 'update user',
    })
    @ApiOkResponse({
        type: Users_Response,
    })
    @HttpCode(HttpStatus.OK)
    @Post(':userId')
    update(@Body() dto: UpdateUserDto, @Param('userId') userId: number) {
        return this.usersService.update(userId, dto);
    }
}
