const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, this is your Express backend!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
