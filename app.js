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
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsRequest = require('./middlewares/cors');

const app = express();
app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('DB OK'))
  .catch((error) => console.log(`DB Error: ${error}`));

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

app.listen(3000, () => {
  console.log('App listening on port');
});
