import React from "react";
import "./index.css";
import App from "./App";
import { StrictMode } from "react";
import { render } from "react-dom";
const rootElement = document.getElementById("root");
render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
