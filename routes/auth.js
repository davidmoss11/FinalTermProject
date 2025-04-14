const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../dbConfig');

const router = express.Router();
const SECRET = 'thisIsSecretKey'; // In real apps, use .env file

// Register Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const hash = bcrypt.hashSync(password, 8);
    const [id] = await db('users').insert({ username, email, password: hash });
    res.status(201).json({ id, username, email });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db('users').where({ username }).first();
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
        expiresIn: '1h',
      });
      res.json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
