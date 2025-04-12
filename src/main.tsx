import { NhostProvider } from "@nhost/react";
import { NhostApolloProvider } from "@nhost/react-apollo";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { nhost } from "~/lib/nhost";
import { router } from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NhostProvider nhost={nhost}>
      <NhostApolloProvider nhost={nhost}>
        <RouterProvider router={router} />
      </NhostApolloProvider>
    </NhostProvider>
  </StrictMode>,
);
