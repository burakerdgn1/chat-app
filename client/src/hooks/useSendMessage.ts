import { useState } from "react";
import { useSocket } from "../contexts/SocketContext";
import { useAppSelector } from "../redux/store";
import { useSendMessageMutation } from "../redux/api/messageApi";
import { Message } from "../types/Message";


export const useSendMessage = () => {
    const [message, setMessage] = useState("");
    const socket = useSocket();
    const selectedUser = useAppSelector((state) => state.userState.selectedUser);
    const currentUser = useAppSelector((state) => state.userState.user);
    const [sendMessage] = useSendMessageMutation();

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() === "" || !selectedUser) return;

        const newMessage: Message = {
            id: null,
            senderId: currentUser?.id || "",
            receiverId: selectedUser.id,
            content: message,
            timestamp: new Date().toISOString(),
        };

        try {
            await sendMessage(newMessage).unwrap();
            if (socket) {
                socket.emit("sendMessage", newMessage);
            }
            setMessage("");
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return {
        message,
        setMessage,
        handleSendMessage,
        selectedUser,
    };
};
