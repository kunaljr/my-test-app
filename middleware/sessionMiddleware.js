const session = require('express-session');
const {RedisStore} = require('connect-redis');
const redisClient = require('../config/redis');

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: 'yourSuperSecretKey', // store securely
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true if using HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
});

module.exports = sessionMiddleware;
