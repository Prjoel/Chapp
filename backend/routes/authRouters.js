const express = require("express");
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const UserService = require('../dbservice/userService');
const { validateUser } = require('../utils/formats');
const bcrypt = require('bcrypt');
const path = require('path');
const signupRouter = express.Router();
const loginRouter = express.Router();
const logoutRouter = express.Router();
const changePasswordRouter = express.Router();


async function verifyPassword(password, hash) {
  return (await bcrypt.compare(password, hash))
}

passport.use(new LocalStrategy(
  async function (email, password, done) {
    let user = await UserService.getUserByEmail(email);
    if (!user) return done(null, false);

    let result = await (verifyPassword(password, user.dataValues.password));
    if (!result) return done(null, false);

    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.dataValues.id)
})
passport.deserializeUser(async (id, done) => {
  let user = await UserService.getUserById(id);
  done(null, user)
})

// ----------------------------------------
signupRouter.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'client', 'public', 'signup.html'));
})
// ----------------------------------------
signupRouter.post('/', async (req, res, next) => {
  let user = req.body;
  if (!validateUser(user)) {
    return res.status(400).send('User invalid. Missing fields.')
  };
  let userFound = await UserService.getUserByEmail(user.email);
  if (userFound) {
    return res.status(409).location('/signup').send('This email is already registered.');
  };
  const saltRounds = 10;
  bcrypt.hash(user.password, saltRounds, async function (err, hash) { // encrypting password
    // Store hash in your password DB.
    if (err) next(err);
    user.password = hash
    await UserService.saveUser(user);
  });
  res.redirect('/login');
})
// ----------------------------------------
loginRouter.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'client', 'public', 'login.html'));
})
// ----------------------------------------
loginRouter.post('/',
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/'
  })
)
changePasswordRouter.put('/', async (req, res, next) => {
  const data = req.body;
  let user = await UserService.getUserById(req.user.dataValues.id);
  let result = await (verifyPassword(data.currentPassword, user.dataValues.password));
  if (result && data.newPassword === data.confirm) {
    const saltRounds = 10;
    bcrypt.hash(data.newPassword, saltRounds, async function (err, hash) { // encrypting password
      if (err) next(err);
      try {
        await UserService.updatePassword(user.id, hash); // Store hash in your password DB.
        return res.sendStatus(200);
      } catch (e) {
        return next(e);
      }
    });
  } else if (!result) {
    return res.sendStatus(403);
  }
  return res.sendStatus(500);
})

logoutRouter.post('/',
  (req, res) => {
    req.logout();
    res.redirect('/login');
  }
)



module.exports = { signupRouter, loginRouter, logoutRouter, changePasswordRouter };