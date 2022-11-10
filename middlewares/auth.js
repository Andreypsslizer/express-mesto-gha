const jwt = require('jsonwebtoken');
const ServerErr = require('../errors/server-err');

/* const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return handleAuthError(res);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
}; */

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
