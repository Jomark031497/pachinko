import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// @ts-expect-error TODO: fontsource issue with types
import "@fontsource/fira-mono";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "~/lib/queryClient.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
