const express = require('express');
const app = express(); // create an instance of express server

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {  // start the server
  console.log(`Server is running on port ${PORT}`);
});
