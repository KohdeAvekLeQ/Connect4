// Modules
const Game = require('../game/game.js');


// Game API
module.exports = class GameAPI {
    constructor(socket, io) {
        this.socket = socket;
        this.io = io;


        // Functions bind
        this.playChip = this.playChip.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.sendNextGame = this.sendNextGame.bind(this);

        
        // Socket events
        this.socket.on('playChip', this.playChip);
        this.socket.on('sendMessage', this.sendMessage);
        this.socket.on('sendNextGame', this.sendNextGame);
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


    // Message sent
    sendMessage(gameID, pseudo, message) {
        // Get new chat
        let [chat, sockets] = Game.addMessage(gameID, pseudo, message);

        // Send to players
        for(let i = 0; i < sockets.length; i++) {
            sockets[i].emit('setMessages', chat);
        }
    }


    // Reset Variabled and set new game
    sendNextGame(gameID) {
        Game.resetForNextGame(gameID);
        Game.updateGame(gameID);
    }
}