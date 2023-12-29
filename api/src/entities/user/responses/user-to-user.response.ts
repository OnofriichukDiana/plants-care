import { getApiPropertyMetadata } from 'src/helpers/getApiPropertyMetadata';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { User } from '../user.entity';
import { UserToUser } from '../user-to-user.entity';

export class UserToUserResponse implements UserToUser {
    @ApiProperty(getApiPropertyMetadata(UserToUser, 'id'))
    @Expose()
    id: number;

    @ApiProperty(getApiPropertyMetadata(UserToUser, 'subscriberId'))
    @Expose()
    subscriberId: number;

    @ApiProperty(getApiPropertyMetadata(UserToUser, 'subscriptionId'))
    @Expose()
    subscriptionId: number;

    @ApiProperty(getApiPropertyMetadata(UserToUser, 'subscription'))
    @Expose()
    subscription: User;

    @ApiProperty(getApiPropertyMetadata(UserToUser, 'subscriber'))
    @Expose()
    subscriber: User;

    @ApiProperty(getApiPropertyMetadata(UserToUser, 'createdAt'))
    @Expose()
    createdAt: Date;
}
