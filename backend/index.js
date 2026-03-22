const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tokens = [];
let currentToken = 0;

// Book token
app.post("/book", (req, res) => {
  const { name, service } = req.body;

  const token = tokens.length + 1;
  tokens.push({ name, service, token, status: "waiting" });

  res.send({ token });
});

// Get tokens
app.get("/tokens", (req, res) => {
  res.send(tokens);
});

// Serve next
app.post("/serve-next", (req, res) => {
  const next = tokens.find(t => t.status === "waiting");

  if (!next) return res.send({ message: "No tokens" });

  next.status = "served";
  currentToken = next.token;

  res.send({ token: currentToken });
});

// Current token
app.get("/status", (req, res) => {
  res.send({ currentToken });
});

// AI prediction
app.get("/predict", (req, res) => {
  const hour = new Date().getHours();

  let crowd = "Low";
  if (hour >= 10 && hour <= 13) crowd = "High";
  else if (hour >= 14 && hour <= 17) crowd = "Medium";

  res.send({ crowd });
});

app.listen(5000, () => console.log("Server running on port 5000"));