/* 
 - start the server 
 - connect to database
 */

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();

const app = require("./src/app")
const { connectToDatabase } = require("./src/config/database")

app.listen(3000, async () => {
  console.log("Server is running on your house bitch")
  await connectToDatabase()
})

