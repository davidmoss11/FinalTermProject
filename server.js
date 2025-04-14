const express = require('express');
const cors = require('cors');

const usersRouter = require('./routes/users');
const jobsRouter = require('./routes/jobs');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/jobs', jobsRouter);

app.get('/', (req, res) => {
  res.send('API is working!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
