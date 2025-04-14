const express = require('express');
const router = express.Router();
const db = require('../dbConfig');

router.get('/', async (req, res) => {
  try {
    const jobs = await db('jobs');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
