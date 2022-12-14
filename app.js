const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const {
  login,
  createUser,
} = require('./controllers/users');
const { validateLogin, validateCreateUser } = require('./middlewares/validateUser');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const NotFoundError = require('./errors/not-found-err');
const corsRequest = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(express.json());

app.use(requestLogger);
app.use(corsRequest);
app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateLogin, login);
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose
  .connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('DB OK'))
  .catch((error) => console.log(`DB Error: ${error}`));

app.listen(3000, () => {
  console.log('App listening on port');
});
