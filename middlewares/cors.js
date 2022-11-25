const allowedCors = [
  'http://domain.mesto.nomoredomains.club',
  'http://domain.mesto.nomoredomains.club',
  'http://api.domain.mesto.nomoredomains.club',
  'http://api.domain.mesto.nomoredomains.club',
  'https://localhost:3000',
  'http://localhost:3000',
];

const corsRequest = ((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  }
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
});

module.exports = corsRequest;
