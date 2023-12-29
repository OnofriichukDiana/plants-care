import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserToUsersService } from './user-to-users.service';
import { UserToUsersController } from './user-to-users.controller';
import { UserToUser } from 'src/entities/user/user-to-user.entity';

@Module({
    controllers: [UserToUsersController],
    providers: [UserToUsersService],
    imports: [TypeOrmModule.forFeature([UserToUser])],
})
export class UserToUsersModule {}
