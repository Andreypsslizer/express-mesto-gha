const jwt = require('jsonwebtoken');
const { ERRORS } = require('../utils/constants');

const handleAuthError = (res) => {
  res
    .status(ERRORS.ERROR_500.CODE)
    .send({ message: ERRORS.ERROR_500.MESSAGE });
};

const auth = (req, res, next) => {
  const { authorization } = req.cookies;

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

  return next();
};

module.exports = auth;
