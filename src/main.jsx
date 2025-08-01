import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import "./assets/fonts/fonts.css";
import "./index.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
