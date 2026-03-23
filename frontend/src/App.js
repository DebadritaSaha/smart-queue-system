import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import Display from "./Display";
import './App.css'; // This brings in your pastel design!

function App() {
  return (
    <BrowserRouter>
      {/* Cleaned up nav - no more inline styles! */}
      <nav>
        <Link to="/">Book Token</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/display">Display</Link>
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