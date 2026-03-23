import React, { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const AVG_SERVICE_TIME_MINS = 5; // Assume 5 mins per person

function Home() {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [token, setToken] = useState(null);
  const [crowd, setCrowd] = useState("Low");
  const [currentToken, setCurrentToken] = useState(0);

  useEffect(() => {
    // 1. Get initial crowd prediction
    fetch(`${API_URL}/predict`)
      .then(res => res.json())
      .then(data => setCrowd(data.crowd));

    // 2. Poll for the live current token so the wait time updates automatically!
    const interval = setInterval(() => {
      fetch(`${API_URL}/status`)
        .then(res => res.json())
        .then(data => setCurrentToken(data.currentToken));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const bookToken = async () => {
    if (!name || !service) return alert("Please enter name and service");
    
    const res = await fetch(`${API_URL}/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, service })
    });
    const data = await res.json();
    setToken(data.token);
  };

  // Calculate live wait time
  const peopleAhead = token ? Math.max(0, token - currentToken - 1) : 0;
  const waitTime = peopleAhead * AVG_SERVICE_TIME_MINS;
  const isYourTurn = token && currentToken === token - 1;

  return (
    <div className="home-container">
      {!token ? (
        <div className="premium-card">
          <div className="card-header">
            <h1>Smart Queue</h1>
            <span className={`crowd-badge ${crowd.toLowerCase()}`}>Crowd: {crowd}</span>
          </div>
          
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="e.g. Rahul Sharma" onChange={e => setName(e.target.value)} />
          </div>
          
          <div className="input-group">
            <label>Service Required</label>
            <input type="text" placeholder="e.g. Account Update" onChange={e => setService(e.target.value)} />
          </div>

          <button className="primary-btn" onClick={bookToken}>Join the Queue</button>
        </div>
      ) : (
        <div className="premium-card ticket-card">
          <h2>Your Digital Ticket</h2>
          <div className="ticket-number">
            <span>Token Number</span>
            <h1>{token}</h1>
          </div>
          
          <div className="live-status">
            {isYourTurn ? (
              <div className="turn-alert pulse">Please proceed to the counter!</div>
            ) : (
              <>
                <div className="status-box">
                  <p>People Ahead</p>
                  <h3>{peopleAhead}</h3>
                </div>
                <div className="status-box">
                  <p>Est. Wait Time</p>
                  <h3>~{waitTime} mins</h3>
                </div>
              </>
            )}
          </div>
          <p className="subtext">This screen will update automatically.</p>
        </div>
      )}
    </div>
  );
}

export default Home;