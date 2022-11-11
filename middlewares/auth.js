const jwt = require('jsonwebtoken');
const ServerErr = require('../errors/server-err');

module.exports = (req, res, next) => {
  let payload;
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return next(new ServerErr('Необходима авторизация'));
    }
    payload = jwt.verify(token, 'some-secret-key');
  } catch (e) {
    return next(new ServerErr('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
