import { Router } from "express";
import { MessageController } from "./message.controller";

export class MessageRoute {
    public messageController: MessageController;
    public router = Router();
    constructor(messageController: MessageController) {
        this.messageController = messageController;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/create', (req, res) => this.messageController.createMessage(req, res));
        this.router.get('/:currentUserId/:requestedUserId', (req, res) => this.messageController.getMessagesByUserId(req, res))
    }

}