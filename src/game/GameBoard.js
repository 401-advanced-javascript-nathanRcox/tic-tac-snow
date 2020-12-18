'use strict';

const { v4: uuidv4 } = require('uuid');

class GameBoard {
  constructor(player1Obj){
    this.uuid = uuidv4(); 
    this.playerId1 = player1Obj[0]._id;
    this.playerName1 = player1Obj[0].displayname;
    this.playerId2 = null;
    this.playerName2 = null;
    this.currentPlayer = null;
    this.gameBoard = {
      r1c1:null, r1c2:null, r1c3:null,// Row One
      r2c1:null, r2c2:null, r2c3:null,// Row Two
      r3c1:null, r3c2:null, r3c3:null, // Row Three
    };
  }
}

module.exports = GameBoard;