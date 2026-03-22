import React, { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Display() {
  const [currentToken, setCurrentToken] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${API_URL}/status`)
        .then((res) => res.json())
        .then((data) => setCurrentToken(data.currentToken));
    }, 3000); // Checks every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="display-screen">
      <h1>📢 Now Serving</h1>
      <div className="big-token">{currentToken || "---"}</div>
      <p>Please proceed to the counter</p>
    </div>
  );
}

export default Display;