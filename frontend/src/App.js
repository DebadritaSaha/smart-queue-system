import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home"; // 👈 This line is the secret! It connects your files.

// Keep Admin and Display as they are for now
function Admin() {
  return <h1>Admin Page</h1>;
}

function Display() {
  return <h1>Display Page</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/display" element={<Display />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;