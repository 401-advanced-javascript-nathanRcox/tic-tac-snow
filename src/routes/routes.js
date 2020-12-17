'use strict';
require('dotenv').config();
const express = require('express');
const authRouter = express.Router();

const User = require('../auth/models/users.js');
const basicAuth = require('../auth/middleware/basic.js')
const bearerAuth = require('../auth/middleware/bearer.js')

const GameBoard = require('../game/GameBoard')
const permissions = require('../auth/middleware/acl.js')

const { v4: uuidv4 } = require('uuid'); 


authRouter.post('/game', bearerAuth, async(req, res, next) => {
  try {
    let game = new GameBoard();
    // const gameRecord = await game.save();
    
    res.status(201).json(game.uuid);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signup', async (req, res, next) => {
  try {
    let user = new User(req.body);
    const userRecord = await user.save();
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  try {
    const users = await User.find({});
    const list = users.map(user => user.username);
    res.status(200).json(list);
  } catch (error) { console.error(error) }
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area')
});

module.exports = authRouter;
