import { Response, Request } from "express";
import { MessageCreateDto } from "./dtos/message.create.dto";
import { MessageService } from "./message.service";

export class MessageController {
  private messageService: MessageService;

  constructor(messageService: MessageService) {
    this.messageService = messageService;
  }
  async getMessagesByUserId(req: Request, res: Response) {
    try {
      const currentUserId = req.params.currentUserId;
      const requestedUserId = req.params.requestedUserId;
      const messages = await this.messageService.getMessages(
        currentUserId,
        requestedUserId
      );
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async createMessage(req: Request, res: Response) {
    try {
      const messageDto: MessageCreateDto = req.body;
      const message = await this.messageService.createMessage(messageDto);
      res.status(201).json({ data: { message } });
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
