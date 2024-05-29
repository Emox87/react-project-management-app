import React from "react";
import ReactDOM from "react-dom/client";
import AppContextProvider from "./store/AppStateContext.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
