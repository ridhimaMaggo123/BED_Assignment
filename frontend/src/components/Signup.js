import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:5000/signup", { username, password });
      setMsg(res.data.message);
      navigate("/");
    } catch (e) {
      setMsg(e.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Signup</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} /><br/>
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br/>
      <button onClick={handleSignup}>Signup</button>
      <p>{msg}</p>
    </div>
  );
}
