import { IsNotEmpty, IsString } from 'class-validator';

export class MessageCreateDto {
    @IsNotEmpty({ message: 'Sender ID is required' })
    @IsString()
    senderId!: string;

    @IsNotEmpty({ message: 'Receiver ID is required' })
    @IsString()
    receiverId!: string;

    @IsNotEmpty({ message: 'Content is required' })
    @IsString()
    content!: string;
}
