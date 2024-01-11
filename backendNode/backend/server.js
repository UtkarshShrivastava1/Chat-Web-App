// backend/server.js
const express = require("express");
const dummyData = require("./dummydata/dummydata");
const { config: configDotenv } = require("dotenv");

configDotenv(); // Invoke configDotenv to load environment variables

const PORT = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});
app.get("/api/chat", (req, res) => {
  console.log(req.params.id);
  res.send(dummyData);
});

app.get("/api/chat/:id", (req, res) => {
  console.log(req.params.id);
  const data = dummyData.find((c) => c.id === req.params.id);
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ message: "Chat not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server Started on PORT http://localhost:${PORT}`);
});
