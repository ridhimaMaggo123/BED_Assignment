const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(session({
  secret: "secret-key",
  resave: false,
  saveUninitialized: true,
}));

const USERS_FILE = "./users.json";
const TASKS_FILE = "./tasks.json";

function readData(file) {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file));
}

function writeData(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required." });

  const users = readData(USERS_FILE);
  if (users.find(u => u.username === username))
    return res.status(400).json({ message: "Username already exists." });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = { id: uuidv4(), username, password: hashed };
  users.push(newUser);
  writeData(USERS_FILE, users);
  res.json({ message: "Signup successful!" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = readData(USERS_FILE);
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: "User not found." });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid password." });

  req.session.userId = user.id;
  res.json({ message: "Login successful!", userId: user.id });
});

app.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out successfully." });
});

app.get("/tasks", (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ message: "Not logged in." });
  const tasks = readData(TASKS_FILE).filter(t => t.userId === req.session.userId);
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ message: "Not logged in." });

  const { title, status } = req.body;
  const tasks = readData(TASKS_FILE);
  const newTask = { id: uuidv4(), userId: req.session.userId, title, status };
  tasks.push(newTask);
  writeData(TASKS_FILE, tasks);
  res.json(newTask);
});

app.delete("/tasks/:id", (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ message: "Not logged in." });
  const id = req.params.id;
  const tasks = readData(TASKS_FILE).filter(
    t => !(t.id === id && t.userId === req.session.userId)
  );
  writeData(TASKS_FILE, tasks);
  res.json({ message: "Task deleted." });
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
