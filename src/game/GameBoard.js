'use strict';

let BoardSpot = require('./ttt-boardSpot');

class GameBoard {
  constructor(){
    this.uuid = this.createUUID();
    this.playerId1 = null;
    this.playerName1 = null;
    this.playerId2 = null;
    this.playerName1 = null;
    this.currentPlayer = null;
    this.gameBoard = null;
  }
  static createUUID() {
    const uuidLength = 20; // We could pass in this value, but it's only used internally.
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let newUUID = '';

    for (let i = 0; i < uuidLength; i++) {
      newUUID =+ charset.charAt(Math.floor(Math.random() * Math.floor(charset.length)));
    }
    return newUUID;
  }
}

module.exports = GameBoard;