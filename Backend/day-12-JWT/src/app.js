const express = require('express');
const authRouter = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');


const app = express();

app.use(express.json());
app.use(cookieParser()); // now server can read and write cookies in the response and request objects


app.use('/api/auth', authRouter); // Or app.use('/api', authRoutes), this prefix(/api/auth) could be anything you want, but it should match the route you defined in auth.routes.js




module.exports = app;