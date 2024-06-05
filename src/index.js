// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Import global CSS
import App from "./App"; // Import main App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") // Ensure there's a div with id 'root' in your HTML
);
