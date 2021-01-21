import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./pages/App";
import { UserStore } from "./context/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserStore>
        <App />
      </UserStore>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
