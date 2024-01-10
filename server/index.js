// required modules/imports
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express(); // initializing express app
const port = process.env.PORT || 3001; // a boolean expression that if port not specified it will default to the port number after the ||

// Middleware
app.use(cors()); // middleware for allowing cross-origin resource sharing (eg. letting our client and server communicate)

// use pool from pg package to create a database connection
const pool = new Pool({
  user: 'aamariles123',
  host: 'localhost',
  database: 'resumes',
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello, 1234566543456iuytr backend!'); // client is requesting info and a response back(GET) localhost:3001 => the response back is the res.send code
});

// client is requesting info from the root directory localhost:3001/auto-fill/:user_id, bc there is no info but the directory exists
// the response back is a server-side failure 500 errors
app.get('/auto-fill/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM resumes WHERE user_id = $1', [user_id]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching auto-fill data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// the same as the code above me no info but the directory exists 500 errors
app.post('/submit-resume', async (req, res) => {
  const { user_id, section, content } = req.body;
  try {
    await pool.query('INSERT INTO resumes (user_id, section, content) VALUES ($1, $2, $3)', [user_id, section, content]);
    res.status(201).send('Resume submitted successfully');
  } catch (error) {
    console.error('Error submitting resume:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server telling it to connect/listen to PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
