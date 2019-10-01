var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const config = require('config');
const client = require('../data-access/client/mongo-client');
const jwt = require('jsonwebtoken');

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, 
  async (email, password, done) => {
    const user = await client.getUserByEmail(email).catch(err => {
      return done(err);
    });

    if (user) {
      const verifyResult = await user.verifyPassword(password);
      if (verifyResult) {
        const payload = {
          email: user.email
        }

        const signOpt = {
          expiresIn: '24h',
          subject: user.email
        }

        const secret = config.secret;
        const token = jwt.sign(payload, secret, signOpt);
        const data = {
          token: token,
          email: user.email
        }
        return done(null, data);
      } else {
        return done(null, false);
      }
    } else {
      return done(null ,false);
    }
}));

router.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
  res.json(req.user);
});

module.exports = router;
