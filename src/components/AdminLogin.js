import React, { useState } from "react";
import './AdminLogin.css';  
import { useNavigate } from "react-router-dom";

function AdminLogin({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e/*event*/) => {
    e.preventDefault();//handles form submission avoids the browser to refresh the page on form submit

    fetch("http://127.0.0.1:5000/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid credentials");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        alert("Login successful!");
        setUsername('');// refrhes the username
        setPassword(''); // refrshes the password

        setUsername('')
        setPassword('')
        navigate('/customers');
      })
      .catch((err) => {
        console.error("Login failed:", err);
        alert("Login failed");
      });
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Admin Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-group">
          <label htmlFor="username" className="input-label">Username</label>
          <input
            id="username"
            type="text"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" className="input-label">Password</label>
          <input
            id="password"
            type="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
//adminn