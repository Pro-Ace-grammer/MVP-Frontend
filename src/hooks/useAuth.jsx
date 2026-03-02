import { useState, useEffect } from "react";
import Keycloak from "keycloak-js";

// 🔹 Configure Keycloak
const keycloak = new Keycloak({
  url: "http://localhost:8080",   // Keycloak server URL
  realm: "myrealm",              // 🔁 Replace with your realm name
  clientId: "myclient",          // 🔁 Replace with your client ID
});

const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    keycloak
      .init({
        onLoad: "login-required",   // forces login
        checkLoginIframe: false,    // avoids iframe issues
      })
      .then((authenticated) => {
        setIsLogin(authenticated);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Keycloak initialization failed:", error);
        setLoading(false);
      });
  }, []);

  return { isLogin, loading, keycloak };
};

export default useAuth;
