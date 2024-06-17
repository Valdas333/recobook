import React, { useState } from "react";
import AuthService from "../../utils/AuthService.js";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.login(username,password);

    } catch (error) {
      if (error.response.status === 403){
        setMessage("Invalid credentials!");
      }
    }
  };

  const handleLogout = () => {
    AuthService.logout();
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <button onSubmit={handleLogout}>Logout</button>
    </div>
  );
};

export default Login;
