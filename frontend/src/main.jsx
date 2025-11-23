import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import "./assets/fonts/fonts.css";
import "./assets/css/index.css";
import App from "./App.jsx";
import SmoothScrollProvider from './SmoothScrollWrapper';
import { Provider } from 'react-redux';
import store from './redux/store.js';

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <SmoothScrollProvider>
        <App />
      </SmoothScrollProvider>
    </BrowserRouter>
    </Provider>
  </StrictMode>
);
