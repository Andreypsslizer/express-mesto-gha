const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/not-authorized-err');

module.exports = (req, res, next) => {
  let payload;
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return next(new NotAuthorizedError('Необходима авторизация'));
    }
    payload = jwt.verify(token, 'some-secret-key');
  } catch (e) {
    return next(new NotAuthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
