import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import keycloak from "./keycloak";

const root = createRoot(document.getElementById("root"));

// Render the app immediately so it doesn't block if Keycloak is down
root.render(
  <StrictMode>
    <App keycloak={keycloak} />
  </StrictMode>
);

// Initialize Keycloak in the background
keycloak
  .init({
    onLoad: "check-sso",      // ✅ DO NOT force login
    checkLoginIframe: false,
    pkceMethod: "S256",
  })
  .then((authenticated) => {
    console.log("Keycloak initialized:", authenticated);
    // Optionally trigger a re-render or update a global store here if needed
  })
  .catch((err) => {
    console.warn("Keycloak init failed (is Docker running?)", err);
  });
// Testing