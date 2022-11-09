const router = require('express').Router(routerconst express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const {
  login,
  createUser,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validateLogin, validateCreateUser } = require('./middlewares/validateUser');

const app = express();
app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('DB OK'))
  .catch((error) => console.log(`DB Error: ${error}`));

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);
router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
app.use(router)
app.use('*', (req, res) => res.status(404).send({ message: '404 — Запрашиваемый ресурс не найден' }));

app.listen(3000, () => {
  console.log('App listening on port');
});
