import React, { useEffect, useState } from "react";

// Fallback to localhost if the environment variable isn't set
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Admin() {
  const [tokens, setTokens] = useState([]);
  const [current, setCurrent] = useState(0);

  const fetchData = async () => {
    // Replaced hardcoded localhost with API_URL
    const t = await fetch(`${API_URL}/tokens`);
    const data = await t.json();
    setTokens(data);

    const s = await fetch(`${API_URL}/status`);
    const st = await s.json();
    setCurrent(st.currentToken);
  };

  const serveNext = async () => {
    // Replaced hardcoded localhost with API_URL
    await fetch(`${API_URL}/serve-next`, { method: "POST" });
    fetchData();
  };

  useEffect(() => {
    fetchData();
    const i = setInterval(fetchData, 2000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="card">
      <h1>Admin Panel</h1>

      <h2>Current: {current}</h2>

      <p>Total: {tokens.length}</p>
      <p>Pending: {tokens.filter(t => t.status === "waiting").length}</p>
      <p>Served: {tokens.filter(t => t.status === "served").length}</p>

      <button onClick={serveNext}>Serve Next</button>

      <ul>
        {tokens.map(t => (
          <li key={t.token}>
            {t.token} - {t.name} ({t.status})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;