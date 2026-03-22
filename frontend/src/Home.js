import React, { useState, useEffect } from "react";

// Fallback to localhost if the environment variable isn't set
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Home() {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [token, setToken] = useState(null);
  const [crowd, setCrowd] = useState("");

  useEffect(() => {
    // Replaced hardcoded localhost with API_URL
    fetch(`${API_URL}/predict`)
      .then(res => res.json())
      .then(data => setCrowd(data.crowd));
  }, []);

  const bookToken = async () => {
    // Replaced hardcoded localhost with API_URL
    const res = await fetch(`${API_URL}/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, service })
    });

    const data = await res.json();
    setToken(data.token);
  };

  return (
    <div className="card">
      <h1>🎟 Smart Queue</h1>
      <p>Expected Crowd: <b>{crowd}</b></p>

      <input placeholder="Your Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Service" onChange={e => setService(e.target.value)} />

      <button onClick={bookToken}>Book Token</button>

      {token && <h2 className="success">🎉 Token: {token}</h2>}
    </div>
  );
}

export default Home;