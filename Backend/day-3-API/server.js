const express = require('express');

const app = express();

app.get('/', (req, res) => {
//   const data = {
//     message: 'Hello, this is your API response!',
//     timestamp: new Date().toISOString(),
//   };
//   res.json(data);
  res.send('Hello hvhvh'); // This will not work because res.json() has already sent a response
});

app.get('/about', (req, res) => {
    res.send('This is the about page of our API');
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});