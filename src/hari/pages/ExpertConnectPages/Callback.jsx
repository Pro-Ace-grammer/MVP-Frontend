import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Callback = ({ keycloak }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      const state = params.get('state');

      if (!code) {
        setError("No authorization code found in the URL.");
        return;
      }

      try {
        // 🚀 Finalize login by sending the code/state to the backend
        const response = await axios.post("/api/auth/login", {
          action: "callback",
          code: code,
          state: state
        });

        if (response.data.access_token) {
          // Store tokens (or update keycloak singleton)
          if (keycloak) {
            keycloak.token = response.data.access_token;
            keycloak.refreshToken = response.data.refresh_token;
            keycloak.authenticated = true;
            // Decode token for use if needed
            try {
               keycloak.tokenParsed = JSON.parse(atob(response.data.access_token.split('.')[1]));
            } catch (e) {
               console.error("Failed to parse token:", e);
            }
          }
          
          // Store in localStorage for persistence if not using a better state manager
          localStorage.setItem('access_token', response.data.access_token);
          
          // Redirect to home or original destination
          navigate('/');
        } else {
          setError("Failed to get tokens from the backend.");
        }
      } catch (err) {
        console.error("Callback error:", err.response?.data || err.message);
        setError("An error occurred during authentication. Please try again.");
      }
    };

    handleCallback();
  }, [location, navigate, keycloak]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => navigate('/signin')}
            className="bg-[#6D3E93] text-white px-6 py-2 rounded-lg hover:bg-[#5B2E7E] transition"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6D3E93] mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Finalizing your secure login...</p>
      </div>
    </div>
  );
};

export default Callback;
