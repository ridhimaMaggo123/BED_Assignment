import React from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎓 Code Academy Gatekeeper</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
        <Signup />
        <Login />
      </div>
    </div>
  );
}

export default App;
