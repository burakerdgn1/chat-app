import { Message } from "../message.model";

export interface MessagesResponse {
    message: string;
    success: boolean;
    messages: Message[];
}