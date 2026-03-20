const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tokens = [];
let currentToken = 0;

// Book Token
app.post("/book", (req, res) => {
  const { name, service } = req.body;

  if (!name || !service) {
    return res.status(400).send({ message: "Fill all fields" });
  }

  const token = tokens.length + 1;

  tokens.push({
    name,
    service,
    token,
    status: "waiting"
  });

  res.send({ message: "Token Booked", token });
});

// Get all tokens
app.get("/tokens", (req, res) => {
  res.send(tokens);
});

// Serve next token
app.post("/serve-next", (req, res) => {
  const next = tokens.find(t => t.status === "waiting");

  if (!next) {
    return res.send({ message: "No pending tokens" });
  }

  next.status = "served";
  currentToken = next.token;

  res.send({ message: `Serving Token ${next.token}`, token: currentToken });
});

// Current status
app.get("/status", (req, res) => {
  res.send({ currentToken });
});

const twilio = require("twilio");

const client = twilio("YOUR_SID", "YOUR_AUTH_TOKEN");

// inside serve-next API
client.messages.create({
  body: `Your token ${currentToken} is now being served`,
  from: "YOUR_TWILIO_NUMBER",
  to: "+911234567890"
});


app.get("/predict", (req, res) => {
  const hour = new Date().getHours();

  let crowd = "Low";

  if (hour >= 10 && hour <= 1) crowd = "High";
  else if (hour >= 2 && hour <= 5) crowd = "Medium";

  res.send({ crowd });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});