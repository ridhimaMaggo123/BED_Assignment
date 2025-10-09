# 🎓 Code Academy Gatekeeper App

A simple Node.js app that allows students to **signup** and **login** using a `users.json` file.

## 🧩 Features
- Register (signup) new students
- Login existing students
- Passwords hashed for security (bcrypt)
- Data stored in `users.json`

## 🚀 Setup
```bash
npm install express body-parser fs bcrypt
node server.js
```

Access API endpoints:
- `POST /signup`
- `POST /login`
