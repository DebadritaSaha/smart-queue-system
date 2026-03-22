import React, { useEffect, useState } from "react";

// Fallback to localhost if the environment variable isn't set
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Display() {
  const [current, setCurrent] = useState(0);

  const fetchStatus = async () => {
    // Replaced hardcoded localhost with API_URL
    const res = await fetch(`${API_URL}/status`);
    const data = await res.json();
    setCurrent(data.currentToken);
  };

  useEffect(() => {
    fetchStatus();
    const i = setInterval(fetchStatus, 2000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="display">
      <h1>Now Serving</h1>
      <h2>{current}</h2>
    </div>
  );
}

export default Display;