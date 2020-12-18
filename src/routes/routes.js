'use strict';
require('dotenv').config();
const express = require('express');
const authRouter = express.Router();

const User = require('../auth/models/users.js');
const GameModel = require('../auth/models/Game.js');
const basicAuth = require('../auth/middleware/basic.js');
const bearerAuth = require('../auth/middleware/bearer.js');
const permissions = require('../auth/middleware/acl.js');
const Collection = require('../auth/models/data-collection.js');
const jwt = require('jsonwebtoken');

const GameBoard = require('../game/GameBoard');

authRouter.post('/game', bearerAuth, async(req, res, next) => {
  try {
    let token = req.headers.authorization.split(' ').pop();
    let parsedToken = jwt.verify(token, process.env.SECRET);
    // Get our user's information
    const player1 = await User.find({ username: parsedToken.username });
    // Create a new instance of the GameBoard
    let game = new GameBoard(player1);
    // Use that instance of the GameBoard to create a Mongoose model
    let gameDB = new GameModel(game);
    // Save the game model to the database.
    const gameRecord = await gameDB.save();
    let response = {
      'uuid': await gameRecord.uuid,    
      'playername:': gameRecord.playerName1,
      'message': 'Waiting for player two.',
    };
    res.status(201).json(response);
  } catch (e) {
    next(e.message);
  }
});

// If 201, next for user is GET /game/play?id=035a7cf9-5e81-4b8f-bbca-bcf36fb1394e
// Game ready, waiting for player two.

authRouter.get('/game/play', bearerAuth, async(req, res, next) => {
  console.log('req.query:', req.query);
  try {
    const gameUUID = req.query.id;
    const gameRecord = await GameModel.findOne({ uuid: gameUUID });
    res.status(201).json(gameRecord);
  } catch (e) {
    next(e.message);
  }
});

// To have player 2 join the game:
// POST /game/join?id=035a7cf9-5e81-4b8f-bbca-bcf36fb1394e

authRouter.post('/game/join', bearerAuth, async(req, res, next) => {
  try {
    // Find our game...
    const gameUUID = req.query.id;
    const gameRecord = await GameModel.findOne({ uuid: gameUUID });
    // Find player 2's info...
    let token = req.headers.authorization.split(' ').pop();
    let parsedToken = jwt.verify(token, process.env.SECRET);
    // Get our user's information
    const player2 = await User.findOne({ username: parsedToken.username });
    gameRecord.playerId2 = player2._id;
    gameRecord.playerName2 = player2.displayname;
    let chooseRandom = (gameRecord) => {
      let currentMove = Math.round(Math.random());
      if (currentMove === 0) {
        console.log('Choose player 1: ' + gameRecord.playerName1);
        return gameRecord.playerName1;
      } else {
        console.log('Choose player 2: ' + gameRecord.playerName2);
        return gameRecord.playerName2;
      }
    };
    gameRecord.currentPlayer = chooseRandom(gameRecord);
    const update = await GameModel.findByIdAndUpdate(gameRecord._id, gameRecord, {useFindAndModify: false});
    res.status(201).json({message: 'Game joined!'});
  } catch (e) {
    next(e.message);
  }
});

authRouter.post('/signup', async (req, res, next) => {
  try {
    let user = new User(req.body);
    const userRecord = await user.save();
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  try {
    const users = await User.find({});
    const list = users.map(user => user.username);
    res.status(200).json(list);
  } catch (error) { console.error(error); }
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area');
});

module.exports = authRouter;
