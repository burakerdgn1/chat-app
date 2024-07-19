import { Message } from "../../../types/Message";

export interface MessageResponse {
  message: string;
  success: boolean;
  messageSent: Message;
}
