const mongoose = require("mongoose")

async function connectToDatabase() {
    // connect to MongoDB
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Ho gya connect');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB Atlas:', error);
        });
}

module.exports = { connectToDatabase }