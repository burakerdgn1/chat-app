import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "../redux/store";

const SocketContext = createContext<Socket | null>(null);
export const useSocket = () => {
  return useContext(SocketContext);
};
export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const currentUser = useAppSelector((state) => state.userState.user);
  useEffect(() => {
    if (currentUser) {
      // console.log("Initializing socket connection");
      const newSocket = io("http://localhost:3000", {
        transports: ["websocket"],
      });

      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id);
      });

      newSocket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
      });

      setSocket(newSocket);
      return () => {
        console.log("Closing socket connection");
        newSocket.close();
      };
    }
  }, [currentUser]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
