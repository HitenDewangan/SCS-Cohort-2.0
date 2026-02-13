/* 
- start the server with `node server.js`

*/

const app = require('./src/app'); // Import the Express app from src/app.js

// Start the server
app.listen(3000, () => {
    console.log(`Server is running on port your house bitch`);
});