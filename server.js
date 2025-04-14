const express = require('express');
const cors = require('cors');

const usersRouter = require('./routes/users');
const jobsRouter = require('./routes/jobs');
const authRouter = require('./routes/auth');
const restricted = require('./middleware/restricted');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('API is working!');
});

app.get('/api/protected', restricted, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}. This is a protected route.` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
