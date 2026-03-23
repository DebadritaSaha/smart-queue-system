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

  const resetQueue = async () => {
    if (window.confirm("Are you sure you want to reset the entire queue?")) {
      const res = await fetch(`${API_URL}/reset`, { method: "POST" });
      const data = await res.json();
      setServedToken(null);
      alert(data.message);
    }
  };

  return (
    <div className="home-container">
      <div className="admin-card">
        
        {/* Header with Title on Left, Reset on Right */}
        <div className="card-header">
          <h1 style={{ marginBottom: 0 }}>👨‍💼 Admin</h1>
          <button className="reset-btn" onClick={resetQueue}>Reset Queue</button>
        </div>

        <button className="admin-btn" onClick={serveNext}>Serve Next Customer</button>
        
        {servedToken && (
          <div className="live-status" style={{ flexDirection: 'column', marginTop: '30px' }}>
            <div className="status-box">
              <p>Now Serving Token</p>
              <h3 style={{ fontSize: '48px', color: '#8ec5fc' }}>{servedToken}</h3>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Admin;