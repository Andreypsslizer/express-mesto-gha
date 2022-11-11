const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const {
  login,
  createUser,
} = require('./controllers/users');
const { validateLogin, validateCreateUser } = require('./middlewares/validateUser');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error');

const app = express();
app.use(express.json());
app.use(errorHandler);

mongoose
  .connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('DB OK'))
  .catch((error) => console.log(`DB Error: ${error}`));

app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateLogin, login);
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use(errors());
app.use('*', (req, res) => res.status(404).send({ message: '404 — Запрашиваемый ресурс не найден' }));

app.listen(3000, () => {
  console.log('App listening on port');
});
