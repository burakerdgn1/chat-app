import { useEffect, useState, useRef } from "react";
import { User } from "../types/User";
import { useAppSelector } from "../redux/store";
import { useGetMessagesQuery } from "../redux/api/messageApi";
import {
  addMessage,
  resetMessagesState,
  setMessages,
} from "../redux/slices/messagesSlice";
import { useDispatch } from "react-redux";
import { useSocket } from "../contexts/SocketContext";
import { Message } from "../types/Message";

const useChatMessages = (currentUser: User | null, user: User | null) => {
  const dispatch = useDispatch();
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const conversations = useAppSelector(
    (state) => state.messageState.conversations
  );

  const {
    data: messages,
    isSuccess,
    isLoading,
    refetch,
  } = useGetMessagesQuery(
    {
      currentUserId: currentUser?.id || "",
      requestedUserId: user?.id || "",
    },
    { skip: !user || !currentUser }
  );

  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    fullName: string | null;
    userName: string | null;
    email: string | null;
    role: string | null;
    profilePicture: string | null;
  }>({
    id: "",
    userName: "",
    fullName: "",
    email: "",
    role: "",
    profilePicture: "",
  });

  useEffect(() => {
    if (isSuccess && messages) {
      dispatch(setMessages({ userId: user?.id!, messages }));
    }
  }, [isSuccess, messages, dispatch, user]);

  useEffect(() => {
    if (currentUser) {
      return () => {
        dispatch(resetMessagesState());
      };
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (currentUser?.id && user?.id) {
      refetch();
    }
  }, [currentUser, user, refetch]);

  useEffect(() => {
    if (user) {
      setSelectedUser({ ...user });
    }
  }, [user]);

  const socket = useSocket();

  useEffect(() => {
    if (user && socket && selectedUser) {
      const handleReceiveMessage = (newMessage: Message) => {
        if (
          newMessage.senderId !== currentUser?.id &&
          newMessage.senderId === selectedUser.id
        ) {
          dispatch(addMessage({ userId: user.id, message: newMessage }));
        }
      };
      socket.on("receiveMessage", handleReceiveMessage);
      return () => {
        socket.off("receiveMessage", handleReceiveMessage);
      };
    }
  }, [user, socket, dispatch, currentUser, selectedUser]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversations]);

  return {
    conversations,
    lastMessageRef,
    isLoading,
    isSuccess,
  };
};

export default useChatMessages;
