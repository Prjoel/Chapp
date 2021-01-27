const express = require('express');
const userInfoRouter = express.Router();
const UserService = require('../dbservice/userService');

userInfoRouter.get('/', async (req, res, next) => {
  let user = await UserService.getUserById(req.user.dataValues.id);
  if (!user) return res.sendStatus(404);
  let toSend = {username: user.username, id: user.id};
  res.send(toSend);
})

module.exports = userInfoRouter;