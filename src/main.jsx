import React from "react";
import ReactDOM from "react-dom/client";
import AppStateContextProvider from "./store/StateContext.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppStateContextProvider>
    <App />
  </AppStateContextProvider>
);
