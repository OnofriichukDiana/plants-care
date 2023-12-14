import {
    Controller,
    Get,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { Auth_LoginDto } from './dto/auth-login.dto';
import { Auth_SignInResponse } from './responses/auth-signin.response';
import { CreateUserDto } from './dto/create-user.dto';
import { RequestType } from 'src/types';
import { Auth_MeResponse } from './responses/me.response';
import { AuthGuard } from './auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({
        description: 'Sign in with email and password',
        summary: 'Sign in',
    })
    @ApiOkResponse({
        type: Auth_SignInResponse,
    })
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    login(@Body() dto: Auth_LoginDto) {
        return this.authService.signin(dto);
    }

    @ApiOperation({
        description: 'Sign up',
        summary: 'Sign up',
    })
    @ApiOkResponse({
        type: Auth_SignInResponse,
    })
    @HttpCode(HttpStatus.OK)
    @Post('signup')
    register(@Body() dto: CreateUserDto) {
        return this.authService.signup(dto);
    }

    // @ApiOperation({
    //     description: 'Refreshes JWT access token with refresh token',
    //     summary: 'Refresh JWT access token',
    // })
    // @ApiOkResponse({
    //     type: Auth_RefreshResponse,
    // })
    // @HttpCode(HttpStatus.OK)
    // @Public()
    // @Post('refresh')
    // refresh(@Body() dto: Auth_RefreshDto) {
    //     return this.authService.refresh(dto);
    // }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: 'Currently authorized user',
        description: 'Retrieve information about currently authorized user',
    })
    @ApiOkResponse({
        type: Auth_MeResponse,
    })
    @HttpCode(HttpStatus.OK)
    @Get('me')
    async user(@Req() req: RequestType) {
        return this.authService.me(req.userId);
    }
}
