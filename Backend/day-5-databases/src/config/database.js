const mongoose = require("mongoose")

async function connectToDatabase() {
    // Connect to MongoDB
    mongoose.connect(process.env.mongodb_uri)
        .then(() => {
            console.log('Ho gya connect');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB Atlas:', error);
        });
}

module.exports = { connectToDatabase }