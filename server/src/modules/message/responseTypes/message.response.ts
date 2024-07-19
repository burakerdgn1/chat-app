import { Message } from "../message.model";

export interface MessageResponse {
    message: string;
    success: boolean;
    messageSent: Message;
}