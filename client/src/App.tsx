import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetMeQuery } from "./redux/api/userApi";
import { useDispatch } from "react-redux";
import { setUser, updateOnlineUsers } from "./redux/slices/userSlice";
import { useSocket } from "./contexts/SocketContext";
import { useAppSelector } from "./redux/store";
import { useLogoutMutation } from "./redux/api/authApi";
import { router } from "./routes";

const App = () => {
  const token = localStorage.getItem("token");
  const {
    data: user,
    isSuccess,
    isError,
  } = useGetMeQuery(undefined, { skip: !token });
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const socket = useSocket();

  const currentUser = useAppSelector((state) => state.userState.user);

  useEffect(() => {
    if (isSuccess && user) {
      dispatch(setUser(user));
    }
    if (isError) {
      logout();
      localStorage.removeItem("token");
    }
  }, [dispatch, isError, isSuccess, logout, user]);

  useEffect(() => {
    if (!socket || !currentUser?.id) return;
    const handleUserListUpdate = (onlineUserIds: string[]) => {
      dispatch(updateOnlineUsers(onlineUserIds));
    };
    // console.log("Connecting user:", currentUser.id);
    socket.on("userListUpdate", handleUserListUpdate);
    socket.emit("userConnected", currentUser.id);
    return () => {
      // console.log("Disconnecting user:", currentUser.id);
      socket.emit("userDisconnected", currentUser.id);
      socket.off("userListUpdate", handleUserListUpdate);
    };
  }, [socket, dispatch, currentUser]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
