const express = require('express');
const router = express.Router();
const db = require('../dbConfig');

router.post('/', async (req, res) => {
  try {
    const [id] = await db('jobs').insert(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const jobs = await db('jobs');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await db('jobs').where({ id: req.params.id }).update(req.body);
    res.json({ message: 'Job updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await db('jobs').where({ id: req.params.id }).del();
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
