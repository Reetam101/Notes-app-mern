const express = require('express');
const app = express();
const dotenv = require('dotenv');
const notes_data = require("./data/notes_data")

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running, welcome!");
});

app.get("/api/notes", (req, res) => {
  res.json(notes_data);
});

app.get("")

app.listen(PORT, console.log(`Server running on ${PORT}`));
