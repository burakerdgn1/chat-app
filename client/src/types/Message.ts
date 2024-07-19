export interface Message {
    id: string | null;
    senderId: string | null;
    receiverId: string | null;
    content: string | null;
    timestamp: string;
}