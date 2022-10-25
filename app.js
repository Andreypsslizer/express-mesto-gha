const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();
app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('DB OK'))
  .catch((error) => console.log(`DB Error: ${error}`));

app.use((req, res, next) => {
  req.user = {
    _id: '635560a724525c3b1bfc1ee2',
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', (req, res) => res.status(404).send({ message: '404 — Запрашиваемый ресурс не найден' }));

app.listen(3000, () => {
  console.log('App listening on port');
});
