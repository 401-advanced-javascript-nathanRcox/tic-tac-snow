'use strict';

let BoardSpot = require('./BoardSpot');
const createUUID = () => {
  const uuidLength = 20; // We could pass in this value, but it's only used internally.
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  let newUUID = '';
  for (let i = 0; i < uuidLength; i++) {
    newUUID =+ charset.charAt(Math.floor(Math.random() * Math.floor(charset.length)));
  } 
  console.log(newUUID);
  return newUUID;
};


class GameBoard {
  constructor(){
    this.uuid = createUUID();
    this.playerId1 = null;
    this.playerName1 = null;
    this.playerId2 = null;
    this.playerName1 = null;
    this.currentPlayer = null;
    this.gameBoard = null;
  }
}
module.exports = GameBoard;