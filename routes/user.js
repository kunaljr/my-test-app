const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const SECRET_KEY = '123456';

router.post('/login', (req, res) => {
  // Normally you'd verify user credentials here
  const user = { id: 1, username: 'kunal', role: 'admin' };

  const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
  req.session.user = user;
  res.json({ token });
})

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Logout failed');
    res.clearCookie('connect.sid'); // default session cookie name
    res.send('Logged out');
  });
});

module.exports = router