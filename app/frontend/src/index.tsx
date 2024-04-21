import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./input.css";
import { AppContextProvider } from "./context/AppContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <div
    // className="bg-fixed bg-center bg-no-repeat bg-cover blur"
    // style={{ backgroundImage: "url('background.jpg')" }}
  >
    <AppContextProvider>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </AppContextProvider>
  </div>
);
