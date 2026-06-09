const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: [true, "Email already exists"]
    },
    password: String
});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;

// schema is blueprint and is created to define the structure of the document.
// model is a class that we can use to create and read documents from the database. (performs CRUD operations)