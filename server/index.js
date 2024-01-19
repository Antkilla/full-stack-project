// required modules/imports
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const app = express(); // initializing express app

// Middleware
app.use(cors()); // middleware for allowing cross-origin resource sharing (eg. letting our client and server communicate)
app.use(express.json()); //built in middleware for parsing JSON sent in requests

// use pool from pg package to create a database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'resumes',
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// My Routes

// hello route for testing purposes
app.get('/', (req, res) => {
  res.send('Hello, 1234566543456iuytr backend!'); // client is requesting info and a response back(GET) localhost:3001 => the response back is the res.send code
});

//auto fill route (still not complete)
// client is requesting info from the root directory localhost:3001/auto-fill/:user_id, bc there is no info but the directory exists
// the response back is a server-side failure 500 errors
app.get('/auto-fill/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM resume WHERE user_id = $1', [user_id]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching auto-fill data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Function to authenticate user (replace with your authentication logic)
const authenticateUser = async (username, password) => {
  // Your authentication logic here
  // Example: Check against a database
  const { rows } = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);

  if (rows.length > 0) {
    return { id: rows[0].user_id, username: rows[0].username };
  } else {
    return null;
  }
};

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // query your database to check if the username and password are valid
    // Authenticate user
    const user = await authenticateUser(username, password);

    if (!user) {
      res.status(401).send('Invalid credentials');
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET,
      { expiresIn: '1h'}
    );
    // Send the token in the response
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(403).send('Invalid Password');
  }
});

// submit resume route
// the same as the code above me no info but the directory exists 500 errors
app.post('/submit-resume', async (req, res) => {
  const { user_id, name, address, section, education, experience } = req.body;
  try {
    await pool.query('INSERT INTO resume (user_id, name, address, section, education, experience) VALUES ($1, $2, $3, $4, $5, $6)', [user_id, name, address, section, education, experience]);
    res.status(201).send('Resume submitted successfully');
  } catch (error) {
    console.error('Error submitting resume:', error);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

// Start the server telling it to connect/listen to PORT
const PORT = process.env.PORT || 3001; // a boolean expression that if port not specified it will default to the port number after the ||
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
