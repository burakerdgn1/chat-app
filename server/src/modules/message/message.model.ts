export class Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: Date;

    constructor(id: string, senderId: string, receiverId: string, content: string, timestamp: Date) {
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.content = content;
        this.timestamp = timestamp;
    }
}
