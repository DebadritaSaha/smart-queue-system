import React, { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Display() {
  const [currentToken, setCurrentToken] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${API_URL}/status`)
        .then((res) => res.json())
        .then((data) => {
          // If a new token is called, speak it!
          if (data.currentToken !== currentToken && data.currentToken !== 0) {
            announceToken(data.currentToken);
            setCurrentToken(data.currentToken);
          }
        });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentToken]);

  const announceToken = (number) => {
    const utterance = new SpeechSynthesisUtterance(`Now serving token number ${number}`);
    utterance.rate = 0.9; // Slightly slower for clarity
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="display-screen">
      <h1>📢 Now Serving</h1>
      <div className="big-token">{currentToken || "---"}</div>
      <p>Please proceed to the counter</p>
    </div>
  );
}

export default Display;