/* *
* server ko create
* config krna

*/

const express = require('express');
const Note = require("./models/note.model");
const cors = require("cors");
const path = require('path');   // built-in module in nodejs to work with file and directory paths


const app = express();
app.use(cors());   // use cors middleware to allow cross-origin requests from frontend

// middleware to parse json data from request body
app.use(express.json());

/* 
 * http://localhost:3000/assets/index-CfhcIE38.js
 * http://localhost:3000/assets/index-CigruAPO.css
 * http://localhost:3000/assets/index-notfoundfile.js ,(this will be handled by the catch-all route handler defined at the end of this file, it will send the index.html file for any unmatched route, this is useful for frontend routing in a single-page application (SPA)
 * 
 */

app.use(express.static(path.join(__dirname, '../public')));   // serve static files from the public directory, this is where our frontend build files will be located

/* 
 * - POST /api/notes -> create a note
 * create new note and save in mongodb
*/
app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
    }

    const newNote = await Note.create({ title, description });
    res.status(201).json({ message: "Note created successfully", note: newNote });
});

/* 
* - GET /api/notes -> get all notes
* - fetch all the notes data from mongodb and send them in the response
*/
app.get("/api/notes", async (req, res) => {
    const notes = await Note.find();   // find() -> always returns an array of objects, if no notes, empty array []
    res.status(200).json({ notes });
});

/* 
 * - DELETE /api/notes/:id -> delete a note by id
 * - delete the note with the given id from req.params
*/
app.delete("/api/notes/:id", async (req, res) => {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    console.log(id);
    res.status(200).json({ message: "Note deleted successfully" });
});

/* 
 * - PATCH /api/notes/:id -> update a note by id
 * - update the note with the given id from req.params and new data from req.body
*/
app.patch("/api/notes/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(id, { title, description });
    res.status(200).json({ message: "Note updated successfully" });
}); 

app.use('*name', (req, res) => {
    // res.status(404).json({ message: "Route not found" });
    // this is a catch-all route handler, it will be executed if no other route matches the incoming request
    // also called a wildcard route handler, it should be defined at the end of all route definitions
    res.sendFile(path.join(__dirname, '../public', 'index.html'));   // send the index.html file for any unmatched route, this is useful for frontend routing in a single-page application (SPA)
});


module.exports = app;




