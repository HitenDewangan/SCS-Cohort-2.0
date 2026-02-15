/* the use of this file is to

- create a server
- config the server to listen to requests

*/

const express = require('express');

const app = express();


// A simple data "database"
let tasks = [
    { id: 1, title: "Learn REST APIss" },
    { id: 2, title: "Deploy my first server" }
];

// Middleware to parse JSON data sent by users
app.use(express.json());


// GET
app.get('/', (req, res) => {
    res.json(tasks);
});

// POST
app.post('/api/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// DELETE
app.delete('/api/tasks/:id', (req, res) => {  // : is a placeholder for the task ID, means it's a dynamic route, id can be any value
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1); // Remove the task from the array
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// PATCH
app.patch('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    
    // 1. Find the task (using the safety check we discussed earlier)
    const taskIndex = tasks.findIndex(t => t && t.id === taskId);

    if (taskIndex !== -1) {
        // 2. Use Object.assign to merge the new data into the old task
        // This keeps existing fields, updates matching ones, and adds new ones.
        tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };

        // res.json(tasks[taskIndex]);
        res.status(200).json({ message: 'Task updated successfully', task: tasks[taskIndex] });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// export the server
module.exports = app; // Export the app for testing purposes