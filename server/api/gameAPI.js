// Modules
const Game = require('../game/game.js');


// Game API
module.exports = class GameAPI {
    constructor(socket, io) {
        this.socket = socket;
        this.io = io;


        // Functions bind
        this.playChip = this.playChip.bind(this);

        
        // Socket events
        this.socket.on('playChip', this.playChip);
    }

    // Play a chip in game
    playChip(gameID, playerID, x) {
        if(Game.getTurn(gameID) === playerID) {
            // Play the chip
            let playable = Game.playChip(gameID, playerID, x);

            // If the chip could be placed
            if(playable) {
                // Send update
                Game.updateGame(gameID);
            }
        }
    }
}