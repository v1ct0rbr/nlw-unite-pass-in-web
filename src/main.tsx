import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import {Toaster} from 'sonner'
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Toaster richColors />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
