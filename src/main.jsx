import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ThemeProvider from "./providers/ThemeProvider.jsx";
import ContextProvider from "./providers/ContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ContextProvider>
  </StrictMode>
);
