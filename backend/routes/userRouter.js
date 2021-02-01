const express = require('express');
const userRouter = express.Router();
const UserService = require('../dbservice/userService');

userRouter.get('/', async (req, res, next) => {
  let user = await UserService.getUserById(req.user.dataValues.id);
  if (!user) return res.sendStatus(404);
  let toSend = { username: user.username, id: user.id, email: user.email };
  res.send(toSend);
})

userRouter.put('/user', async (req, res, next) => {
  const updateStatus = await UserService.updateUser(req.body, req.user.dataValues.id, req.user.email);
  
  if(updateStatus instanceof Error) {
    return res.status(409).send(updateStatus.message);
  }
  res.send({ updateStatus: updateStatus });
});

userRouter.delete('/user', async (req, res, next) => {
  const deleteResult = await UserService.deleteUser(req.user.dataValues.id);
  if(!deleteResult) {
    res.sendStatus(500);
  } else {
    req.logout();
    res.sendStatus(204);
  }
});
module.exports = userRouter;