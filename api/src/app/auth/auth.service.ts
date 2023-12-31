import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Auth_LoginDto } from './dto/auth-login.dto';
import { UsersService } from '../users/users.service';
import { transform } from 'src/helpers/class-transformer';
import { Auth_MeResponse } from './responses/me.response';
import { Auth_SignInResponse } from './responses/auth-signin.response';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService,
        private usersService: UsersService,
    ) {}

    async signup(createUserDto: CreateUserDto) {
        const exsistedUser = await this.userRepository.findOne({
            where: {
                email: createUserDto.email,
            },
        });
        if (exsistedUser) {
            throw new BadRequestException(
                `User with provided email already exists`,
            );
        }

        const newUser = await this.usersService.create(createUserDto);

        const payload = { sub: newUser.id, username: newUser.name };
        const token = await this.jwtService.signAsync(payload);

        return {
            me: newUser,
            token,
        };
    }

    async signin(AuthLogInDto: Auth_LoginDto) {
        let user = await this.userRepository.findOne({
            where: {
                email: AuthLogInDto.email,
            },
        });
        if (!user) {
            throw new BadRequestException(`User with provided email not found`);
        }

        const isPasswordMatch = await compare(
            AuthLogInDto.password,
            user.password,
        );

        if (!isPasswordMatch) {
            throw new UnauthorizedException(`Password is not correct`);
        }

        const payload = { sub: user.id, username: user.name };
        const token = await this.jwtService.signAsync(payload);

        return transform(Auth_SignInResponse, {
            me: user,
            token,
        });
    }

    async me(userId: number) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        return transform(Auth_MeResponse, { me: user });
    }
}
