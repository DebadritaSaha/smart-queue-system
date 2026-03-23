import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; // Added Link
import Home from "./Home";
import Admin from "./Admin";
import Display from "./Display";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* Simple Navigation Bar */}
      <nav style={{ padding: "10px", textAlign: "center", background: "#fff", marginBottom: "20px" }}>
        <Link to="/" style={{ margin: "10px" }}>Book Token</Link>
        <Link to="/admin" style={{ margin: "10px" }}>Admin</Link>
        <Link to="/display" style={{ margin: "10px" }}>Display</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/display" element={<Display />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;