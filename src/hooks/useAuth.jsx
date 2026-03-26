import { useState, useEffect } from "react";
import keycloak from "../keycloak";

// 🔹 Note: Keycloak is configured in src/keycloak.js using environment variables

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
