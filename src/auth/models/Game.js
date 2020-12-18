'use strict';

const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  uuid: { type: String, require: true, unique: true },
  playerId1: { type: String, require: true, unique: true },
  playerName1: { type: String, require: true },
  playerId2: { type: String, require: true, unique: true },
  playerName2: { type: String, require: true },
  currentPlayer: { type: String, require: true },
  gameBoard: { type: [], require: true },
});

const gameModel = mongoose.model('gameModel', gameSchema);

module.exports = gameModel;