import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", { username, password }, { withCredentials: true });
      localStorage.setItem("userId", res.data.userId);
      navigate("/dashboard");
    } catch (e) {
      setMsg(e.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Login</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} /><br/>
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br/>
      <button onClick={handleLogin}>Login</button>
      <p>{msg}</p>
      <p>New user? <Link to="/signup">Signup</Link></p>
    </div>
  );
}
