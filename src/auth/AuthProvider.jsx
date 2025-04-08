import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
let hasRun = false;

export const useAuth = () => useContext(AuthContext);

const CLIENT_ID = "0396183bb5b544b186b688a1220449cf";
const REDIRECT_URI = "http://localhost:5173";
const SCOPES = "user-read-private user-read-email user-top-read";

const generateRandomString = (length = 128) =>
  [...crypto.getRandomValues(new Uint8Array(length))]
    .map((x) => ("0" + x.toString(16)).slice(-2))
    .join("");

const sha256 = (plain) =>
  crypto.subtle.digest("SHA-256", new TextEncoder().encode(plain));

const base64url = (input) =>
  btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);

  useEffect(() => {
    if (hasRun) return;
    hasRun = true;
    
    const storedToken = localStorage.getItem("access_token");
    const storedExpiry = localStorage.getItem("expires_at");

    console.log(storedExpiry && Date.now() < parseInt(storedExpiry))
    if (storedToken && storedExpiry && Date.now() < parseInt(storedExpiry)) {
      setAccessToken(storedToken);
      setExpiresAt(parseInt(storedExpiry));
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        const codeVerifier = localStorage.getItem("code_verifier");

        fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: CLIENT_ID,
            grant_type: "authorization_code",
            code,
            redirect_uri: REDIRECT_URI,
            code_verifier: codeVerifier,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            const { access_token, expires_in } = data;
            const expires_at = Date.now() + expires_in * 1000;

            setAccessToken(access_token);
            setExpiresAt(expires_at);

            console.log(`access_token: ${access_token}`);
            console.log(`expires_at: ${expires_at}`);
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("expires_at", expires_at);

            // Clean up URL
            window.history.replaceState({}, document.title, "/");
          })
          .catch((err) => console.error("Token exchange failed", err));
      }
    }
  }, []);

  const login = async () => {
    const codeVerifier = generateRandomString(64);
    const challenge = await sha256(codeVerifier).then(base64url);

    localStorage.setItem("code_verifier", codeVerifier);

    const authUrl = new URL("https://accounts.spotify.com/authorize");
    authUrl.searchParams.set("client_id", CLIENT_ID);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
    authUrl.searchParams.set("scope", SCOPES);
    authUrl.searchParams.set("code_challenge_method", "S256");
    authUrl.searchParams.set("code_challenge", challenge);

    window.location.href = authUrl.toString();
  };

  const logout = () => {
    localStorage.clear();
    setAccessToken(null);
    setExpiresAt(null);
  };

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider
      value={{ accessToken, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
