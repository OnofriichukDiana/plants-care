import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    UseGuards,
    Param,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Users_Response } from './users.response';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(private readonly userService: UserService) {}

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
        return this.userService.update(userId, dto);
    }
}
