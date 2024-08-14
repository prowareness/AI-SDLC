import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  // Function to validate email format
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages
    setUsernameError("");
    setPasswordError("");

    // Validate inputs
    let valid = true;

    if (!username) {
      setUsernameError("Username is required");
      valid = false;
    } else if (!isValidEmail(username)) {
      setUsernameError("Please enter a valid email address");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    }

    if (!valid) {
      return;
    }
    navigate("/dashboard");
    try {
      const response = await axios.post("/api/login", {
        emailid: username,
        password: password,
      });

      console.log("Login successful:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="form-title">
        <h2>Login</h2>
        <p>Please enter your credentials and login</p>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && (
            <div className="error-message">{usernameError}</div>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <div className="error-message">{passwordError}</div>
          )}
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
