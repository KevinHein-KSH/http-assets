import "./style.css";
import App from "./App";
import { StrictMode } from "react";
import { theme } from "./config/theme"; // your custom theme file
import { createRoot } from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import "github-markdown-css/github-markdown.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);