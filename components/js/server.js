const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;
const DB_URL = 'mongodb://localhost:27017/budgetDB';

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const conn = mongoose.connection;

conn.on('error', (err) => {
  console.error('Error connecting to the database:', err);
});

conn.once('open', () => {
  console.log('Successfully connected to the database');
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/api/users', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ message: 'Please provide all required fields' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  user.save((err) => {
    if (err) {
      return res.status(500).send({ message: 'Error creating user' });
    }
    res.send({ message: 'User created successfully' });
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Please provide all required fields' });
  }

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).send({ message: 'Error logging in' });
    }
    if (!user) {
      return res.status(401).send({ message: 'User not found' });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send({ message: 'Invalid password' });
    }

    res.send({ message: 'Logged in successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});