/* 
 - start the server 
 - connect to database
 */

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = require("./src/app")
const mongoose = require("mongoose")

// mongodb+srv://HIDED:<db_password>@cluster0.ngyyinm.mongodb.net/?appName=Cluster0
// mongodb+srv://HIDED:db%40123@cluster0.ngyyinm.mongodb.net/

async function connectToDatabase() {
    // Connect to MongoDB
    mongoose.connect('mongodb+srv://HIDED:db%40123@cluster0.ngyyinm.mongodb.net/firstdb')
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

