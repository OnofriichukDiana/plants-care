import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserToUserDto {
    @ApiProperty({
        description: 'subscription id',
    })
    @IsNotEmpty()
    @IsInt()
    subscriptionId: number;
}
