import React from "react";
import ReactDOM from "react-dom";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store"; //this
import App from "./App"; //this
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import "./index.css";

import theme from "./app/MaterialTheme/index"; //this
import { SocketContext, socket } from "./app/context/socket";

//const container = document.getElementById("root")!;
//const root = createRoot(container);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SocketContext.Provider value={socket}>
          <App />
        </SocketContext.Provider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
