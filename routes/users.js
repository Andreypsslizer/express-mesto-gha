const usersRouter = require('express').Router();
const { validateUserId, validateUpdateUser, validateAvatar } = require('../middlewares/validateUser');

const {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUser);
usersRouter.get('/:userId', validateUserId, getUser);
usersRouter.patch('/me', validateUpdateUser, updateUser);
usersRouter.patch('/me/avatar', validateAvatar, updateUserAvatar);

module.exports = usersRouter;
