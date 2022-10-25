const User = require('../models/user');
const { ERRORS } = require('../utils/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res
        .status(ERRORS.ERROR_500.CODE)
        .send({ message: ERRORS.ERROR_500.MESSAGE });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('notValidId'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERRORS.ERROR_400.CODE)
          .send({ message: ERRORS.ERROR_400.MESSAGE });
      } else if (err.message === 'notValidId') {
        res
          .status(ERRORS.ERROR_404.CODE)
          .send({ message: ERRORS.ERROR_404.MESSAGE });
      } else {
        res
          .status(ERRORS.ERROR_500.CODE)
          .send({ message: ERRORS.ERROR_500.MESSAGE });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => res.send(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERRORS.ERROR_400.CODE)
          .send({ message: ERRORS.ERROR_400.MESSAGE });
      } else {
        res
          .status(ERRORS.ERROR_500.CODE)
          .send({ message: ERRORS.ERROR_500.MESSAGE });
      }
    });
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('notValidId'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res
          .status(ERRORS.ERROR_400.CODE)
          .send({ message: ERRORS.ERROR_400.MESSAGE });
      } else if (err.message === 'notValidId') {
        res
          .status(ERRORS.ERROR_404.CODE)
          .send({ message: ERRORS.ERROR_404.MESSAGE });
      } else {
        res
          .status(ERRORS.ERROR_500.CODE)
          .send({ message: ERRORS.ERROR_500.MESSAGE });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('notValidId'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res
          .status(ERRORS.ERROR_400.CODE)
          .send({ message: ERRORS.ERROR_400.MESSAGE });
      } else if (err.message === 'notValidId') {
        res
          .status(ERRORS.ERROR_404.CODE)
          .send({ message: ERRORS.ERROR_404.MESSAGE });
      } else {
        res
          .status(ERRORS.ERROR_500.CODE)
          .send({ message: ERRORS.ERROR_500.MESSAGE });
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
