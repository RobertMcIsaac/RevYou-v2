import { Provider } from "@/components/ui/provider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from '@auth0/auth0-react';
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
      redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL, //for redirect after login. Must match Allowed Callback URLs on auth0 tenant account
      audience: import.meta.env.VITE_AUTH0_AUDIENCE, // Points to the Auth0 Express API
      scope: "openid profile email", // This tells Auth0 to include standard user profile claims
      }}
      >
      <Provider>
        <App />
      </Provider>
    </Auth0Provider>
  </StrictMode>
);

// TODO: Check combination of ChakraUI and Auth0 providers

