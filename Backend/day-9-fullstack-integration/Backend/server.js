/*
* server ko start krna
* database se connect karna
 */

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require("dotenv").config()
const { connectToDatabase } = require("./src/config/database")

const app = require("./src/app")

app.listen(3000, async () => {
  console.log("Server is running on your house bitch")
  await connectToDatabase();
})