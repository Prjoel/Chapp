const express = require("express");
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const UserService = require('../dbservice/userService');
const { verifyPassword, validateUser } = require('../utils/formats');
const bcrypt = require('bcrypt');

const signupRouter = express.Router();
const loginRouter = express.Router();
const logoutRouter = express.Router();


passport.use(new LocalStrategy(
  async function (email, password, done) {
    let user = await UserService.getUserEmail(email)
    if (!user) return done(null, false);
    if (!verifyPassword(user, password)) { return done(null, false); }
    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  done(null, { id: 10, name: 'Joelinho' })
})


signupRouter.post('/', async (req, res, next) => {
  console.log(req.body);
  let user = req.body;
  if (!validateUser(user)) res.status(400).send('User invalid. Missing fields.');
  let userFound = await UserService.getUserEmail(user.email);
  console.log('-------\n', userFound, '\n-------')
  if (userFound) return res.status(409).send('This email is already registered.');
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

})


loginRouter.post('/', passport.authenticate('local', { failureMessage: 'Nooooooooo, wait. YES!' }), (req, res, next) => {
  res.status(201).send('Todo bien')
})


module.exports = { signupRouter, loginRouter, logoutRouter };