// create register api and use in app the js

const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const authRouter = express.Router();
// NOTE : if your want to create an api in a file other than app.js then you need express.Router()

authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email });

    if (isUserAlreadyExist) {
        return res.status(409).json({ message: "User already exists with this email" });
    }

    try {
        const user = await userModel.create({ name, email, password });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('jwt-token', token, { httpOnly: true });

        res.status(201).json({ message: "User registered successfully", user, token });
    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
});



module.exports = authRouter;