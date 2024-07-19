import SignInPage from "./Pages/SignInPage/SignIn";
import SignUpPage from "./Pages/SignUpPage/SignUp";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Pages/Layout";
import { HomePage } from "./Pages/HomePage";
import { AccountPage } from "./Pages/AccountPage/AccountPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Redirect from "./components/Redirect";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/signin" replace />,
      },
      {
        element: <Redirect />,
        children: [
          {
            path: "/signin",
            element: <SignInPage />,
          },
          {
            path: "/signup",
            element: <SignUpPage />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/homepage",
            element: <HomePage />,
          },

          {
            path: "/account",
            element: <AccountPage />,
          },
        ],
      },
    ],
  },
]);
