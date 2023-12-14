import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { genSalt, hash } from 'bcryptjs';
import { transform } from 'src/helpers/class-transformer';
import { Users_Response } from './users.response';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const salt = await genSalt(10);
        const hashed = await hash(createUserDto.password, salt);
        createUserDto.password = hashed;

        const newUser = await this.userRepository.save(createUserDto);

        return transform(Users_Response, newUser);
    }

    async update(userId: number, updateUserDto: UpdateUserDto) {
        await this.userRepository.update(userId, updateUserDto);
        let user = await this.userRepository.findOneBy({
            id: userId,
        });

        return transform(Users_Response, user);
    }
}
