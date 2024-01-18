-------Create a database
CREATE DATABASE resumes

-------Create the user table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),    
  password VARCHAR(255)
);

-------Create a resume table with a foreign key to the users table
CREATE TABLE resume (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  name VARCHAR(255),
  address VARCHAR(255),
  education TEXT,
  section VARCHAR(255),
  experience TEXT
);
