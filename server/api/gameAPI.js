// Modules
const Game = require('../game/game.js');


// Game API
module.exports = class GameAPI {
    constructor(socket, io) {
        this.socket = socket;
        this.io = io;


        // Functions bind
        // this.getLobby = this.getLobby.bind(this);

        
        // Socket events
        // this.socket.on('getLobby', this.getLobby);
    }
}