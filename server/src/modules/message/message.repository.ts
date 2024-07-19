import { Database } from "../../database/database";
import { MessageCreateDto } from "./dtos/message.create.dto";
import { Message } from "./message.model";

export class MessageRepository {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public async getMessagesByUserId(currentUserId: string, requestedUserId: string): Promise<Message[]> {
        try {

            const query = `SELECT * FROM messages WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id =$1) ORDER BY timestamp ASC`;
            const rows = await this.db.query(query, [currentUserId, requestedUserId]);
            const messages = rows.map((row: any) => new Message(row.id, row.sender_id, row.receiver_id, row.content, row.timestamp));
            return messages;
        }
        catch (err) {
            throw new Error(`Error fetching message from database:${err}`);
        }
    }

    public async createMessage(message: MessageCreateDto): Promise<Message> {
        try {
            const { senderId, receiverId, content } = message;
            const rows = await this.db.query(`INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3) RETURNING *`, [senderId, receiverId, content]);
            const row = rows[0];
            return new Message(row.id, row.sender_id, row.receiver_id, row.content, row.timestamp);

        }
        catch (err) {
            throw new Error(`Error creating message in database:${err}`);
        }
    }


}