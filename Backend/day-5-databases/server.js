/* 
 - start the server 
 - connect to database
 */

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();

const app = require("./src/app")
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

app.listen(3000, async () => {
  console.log("Server is running on your house bitch")
  await connectToDatabase()
})

