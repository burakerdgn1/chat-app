import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { SocketProvider } from "./contexts/SocketContext"; // If you have a SocketContext
import { ThemeProvider } from "@emotion/react";
import theme from "./theme.ts";
import CssBaseline from "@mui/material/CssBaseline";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <SocketProvider>
          <App />
        </SocketProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
