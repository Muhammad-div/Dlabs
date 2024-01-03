import React, { useState } from "react";
import Header from "../global/header/Header";
import MainFooter from "../global/footer/MainFooter";
import "./Auth.css";
import axios from "../../axios/axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoggingIn(true);

      const response = await axios.post("/api/auth/", {
        authMethod: "email/password",
        authData: {
          email: username,
          password,
        },
      });

      console.log(response);

      const token = response.data.token;
      localStorage.setItem("token", token);

      if (token) window.location.href = "/dashboard";
      // if (token) navigate("/dashboard");

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      alert("Login Successfully!");

      setLoggingIn(false);
    } catch (error) {
      console.error("Login failed", error);

      setLoggingIn(false);

      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <Header />
      <div className="auth-body">
        <div className="auth-container">
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <p className="auth_note">
              Don't have an account? <Link to="/signup">SignUp</Link>
            </p>
            <button type="submit" disabled={loggingIn}>
              {loggingIn ? "Logging In..." : "Login"}
            </button>
          </form>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default Auth;
