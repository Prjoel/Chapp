const express = require("express");
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const UserService = require('../dbservice/userService');
const { validateUser } = require('../utils/formats');
const bcrypt = require('bcrypt');

const signupRouter = express.Router();
const loginRouter = express.Router();
const logoutRouter = express.Router();


async function verifyPassword(password, user) {
  return (await bcrypt.compare(password, user.dataValues.password))
}

passport.use(new LocalStrategy(
  async function (email, password, done) {
    let user = await UserService.getUserByEmail(email);
    if (!user) return done(null, false);

    let result = await (verifyPassword(password, user));
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


signupRouter.post('/', async (req, res, next) => {
  let user = req.body;
  if (!validateUser(user)) {
    return res.status(400).send('User invalid. Missing fields.')
  };
  let userFound = await UserService.getUserByEmail(user.email);
  if (userFound) {
    return res.status(409).send('This email is already registered.')
  };
  const saltRounds = 10;
  bcrypt.hash(user.password, saltRounds, async function (err, hash) { // encrypting password
    // Store hash in your password DB.
    if (err) next(err);
    user.password = hash
    await UserService.saveUser(user);
  });
  res.status(201).send('User saved.');
})

loginRouter.get('/', (req, res, next) => {
  //console.log('req.session: ', req);
  console.log('req.user: ', req.isAuthenticated())
  res.sendStatus(200)
})


loginRouter.post('/',
  passport.authenticate('local', { failureMessage: 'Nooooooooo, wait. YES!' }),
  (req, res, next) => {
    //console.log('req.user: ')
    res.sendStatus(200);
  }
)
loginRouter.put('/', (req, res, next) => { // route for testing
  console.log(req.isAuthenticated());
  res.sendStatus(203)
})

logoutRouter.post('/',
  (req, res, next) => {
    console.log(req.isAuthenticated())
    req.logout();
    res.sendStatus(200);
  }
)

module.exports = { signupRouter, loginRouter, logoutRouter };