import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import keycloak from "./keycloak";

const root = createRoot(document.getElementById("root"));

keycloak
  .init({
    onLoad: "check-sso",      // ✅ DO NOT force login
    checkLoginIframe: false,
    pkceMethod: "S256",
  })
  .then((authenticated) => {
    console.log("Keycloak initialized:", authenticated);

    root.render(
      <StrictMode>
        <App keycloak={keycloak} />
      </StrictMode>
    );
  })
  .catch((err) => {
    console.error("Keycloak init failed", err);
  });
