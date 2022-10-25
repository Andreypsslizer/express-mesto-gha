const Card = require('../models/card');
const { ERRORS } = require('../utils/constants');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => {
      res
        .status(ERRORS.ERROR_500.CODE)
        .send({ message: ERRORS.ERROR_500.MESSAGE });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((newCard) => res.send(newCard))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
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

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('notValidId'))
    .then((card) => res.send(card))
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

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('notValidId'))
    .then((card) => res.send(card))
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

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true },
  )
    .orFail(new Error('notValidId'))
    .then((card) => res.send(card))
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

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
