import { MessageCreateDto } from "./dtos/message.create.dto";
import { Message } from "./message.model";
import { MessageRepository } from "./message.repository";
import { MessageResponse } from "./responseTypes/message.response";
import { MessagesResponse } from "./responseTypes/messages.response";

export class MessageService {
    public messageRepository: MessageRepository;
    constructor(messageRepository: MessageRepository) {
        this.messageRepository = messageRepository;
    }

    public async getMessages(currentUserId: string, requestedUserId: string): Promise<Message[]> {

        try {
            const messages = await this.messageRepository.getMessagesByUserId(currentUserId, requestedUserId);
            return messages;
        }

        catch (err) {
            throw new Error(`Error in MessageService.getMessages: ${err}`);
        }
    }

    public async createMessage(messageCreate: MessageCreateDto): Promise<MessageResponse> {
        try {
            const createdMessage = await this.messageRepository.createMessage(messageCreate);
            return { success: true, message: 'Message fetched successfully', messageSent: createdMessage };
        }
        catch (err) {
            throw new Error(`Error in MessageService.createMessage: ${err}`);
        }
    }
}