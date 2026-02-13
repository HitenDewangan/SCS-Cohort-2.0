const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data sent by users
app.use(express.json());

// A simple data "database"
let tasks = [
    { id: 1, title: "Learn REST APIss" },
    { id: 2, title: "Deploy my first server" }
];

// --- REST API ROUTES ---

// 1. GET: Read all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// 2. POST: Create a new task
app.post('/api/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});