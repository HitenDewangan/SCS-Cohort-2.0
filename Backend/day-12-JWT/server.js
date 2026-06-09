// 1. ENVIRONMENT CONFIGURATION (Must be at the absolute top)
require('dotenv').config();

// 2. NETWORK & SYSTEM CONFIGURATIONS
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

// 3. CORE MODULE / THIRD-PARTY IMPORTS
// (None in this file, but this is where express, cors, etc. would go if imported here)

// 4. LOCAL FILE IMPORTS (App and Database configs)
const app = require('./src/app');
const connectDB = require('./src/config/database');

// 5. CONSTANTS & INITIALIZATIONS
const PORT = process.env.PORT || 3000;

// 6. EXECUTION (Connect to DB first, then start listening)
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connected & Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Server failed to start due to DB connection error:", err);
  });


/* 
By keeping the server turned off until the database gives a green light, you prevent users from hitting a broken website.
*/