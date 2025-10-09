import React, { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:5000/signup", {
        username,
        password,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div style={{ border: "1px solid gray", padding: "20px", borderRadius: "10px" }}>
      <h2>Signup Door 🚪</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      /><br/><br/>
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br/><br/>
      <button onClick={handleSignup}>Signup</button>
      <p>{message}</p>
    </div>
  );
}
