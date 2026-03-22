import React, { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Admin() {
  const [servedToken, setServedToken] = useState(null);

  const serveNext = async () => {
    const res = await fetch(`${API_URL}/serve-next`, { method: "POST" });
    const data = await res.json();
    if (data.token) {
      setServedToken(data.token);
    } else {
      alert("No more tokens in the queue!");
    }
  };

  return (
    <div className="card admin-card">
      <h1>👨‍💼 Admin Panel</h1>
      <button className="admin-btn" onClick={serveNext}>Serve Next Customer</button>
      {servedToken && (
        <div className="now-serving">
          <p>Now Serving Token:</p>
          <h2 className="token-number">{servedToken}</h2>
        </div>
      )}
    </div>
  );
}

export default Admin;