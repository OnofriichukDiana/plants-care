import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ChatMessageResponse } from 'src/entities/chat/responses/chat-message.response';
import { ChatMessageFile } from 'src/entities/media/chat-message-file.entity';
import { Media } from 'src/entities/media/media.entity';
import { ChatMessageFileResponse } from 'src/entities/media/responses/chat-message-file.response';
import { MediaResponse } from 'src/entities/media/responses/media.response';
import { UserResponse } from 'src/entities/user/responses/user.response';
import { User } from 'src/entities/user/user.entity';

export class ChatMessages_Response_User extends PickType(UserResponse, [
    'id',
    'name',
    'icon',
    'avatarBackground',
    'avatarUrl',
]) {}

export class Files_Response_Media extends PickType(MediaResponse, ['path']) {}

export class ChatMessages_Response_Files extends PickType(
    ChatMessageFileResponse,
    ['id', 'media'],
) {
    @ApiProperty({
        type: () => Files_Response_Media,
    })
    @Type(() => Files_Response_Media)
    declare media: Media;
}

export class ChatMessages_Response extends PickType(ChatMessageResponse, [
    'id',
    'message',
    'fromUserId',
    'toUserId',
    'isViewed',
    'fromUser',
    'toUser',
    'chatMessageFiles',
    'createdAt',
    'updatedAt',
]) {
    @ApiProperty({
        type: () => ChatMessages_Response_Files,
    })
    @Type(() => ChatMessages_Response_Files)
    declare chatMessageFiles: ChatMessageFile[];

    @ApiProperty({
        type: () => ChatMessages_Response_User,
    })
    @Type(() => ChatMessages_Response_User)
    declare fromUser: User;

    @ApiProperty({
        type: () => ChatMessages_Response_User,
    })
    @Type(() => ChatMessages_Response_User)
    declare toUser: User;
}
