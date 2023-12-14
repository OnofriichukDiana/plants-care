import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/entities/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

const secretKey = process.env.SECRET_KEY || ' ';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            global: true,
            secret: secretKey,
            signOptions: { expiresIn: '60h' },
        }),
        UserModule,
    ],
})
export class AuthModule {}
