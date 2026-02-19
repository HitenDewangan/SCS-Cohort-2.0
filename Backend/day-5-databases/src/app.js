/* create and config the server */

const express = require("express")

const app =express()
const Avengers = require('./models/avengers.model');

/*  
    - req.body -> {avenger, cast} for POST and PATCH requests
    - POST /avengers -> create a new avenger
    - GET /avengers -> get all avengers
    - GET /avengers/:id -> get a avenger by id
    - PATCH /avengers/:id -> update a avenger by id
    - DELETE /avengers/:id -> delete a avenger by id

*/

// for getting the body of the request, we need to use the express.json() middleware, it will parse the JSON data sent by the user and make it available in req.body
app.use(express.json())

app.post("/avengers", async (req, res) => {
    const {avenger, cast} = req.body
    if(!avenger || !cast) {
        return res.status(400).json({message: "Avenger and cast are required"})
    }
    // save the avenger in the database
    const newAvenger = await Avengers.create({avenger, cast})
    res.status(201).json({message: "Avenger created successfully", avenger: newAvenger})
})

// post if user send id too

app.get("/avengers", async (req, res) => {
    const avengers = await Avengers.find()
    res.status(200).json({message: "Avengers fetched successfully", avengers})
})

app.get("/avengers/:id", async (req, res) => {
    const {id} = req.params
    const avenger = await Avengers.findById(id)
    if(!avenger) {
        return res.status(404).json({message: "Avenger not found"})
    }
    res.status(200).json({message: "Avenger fetched successfully", avenger})
})

module.exports = app