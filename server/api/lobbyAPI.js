// Modules
const Lobby = require('../lobby/lobby.js');


// Lobby API
module.exports = class LobbyAPI {
    constructor(socket, io) {
        this.socket = socket;
        this.io = io;


        // Functions bind
        this.getLobby = this.getLobby.bind(this);
        this.createGame = this.createGame.bind(this);
        this.updateLobby = this.updateLobby.bind(this);
        this.deleteGame = this.deleteGame.bind(this);

        
        // Socket events
        this.socket.on('getLobby', this.getLobby);
        this.socket.on('createGame', this.createGame);
        this.socket.on('deleteGame', this.deleteGame);
    }


    // Get Lobby
    getLobby() {
        this.socket.emit('setLobby', Lobby.getLobby());
    }
    updateLobby() {
        this.io.sockets.emit('setLobby', Lobby.getLobby());
    }


    // Create game
    createGame(pseudo) {
        let ind = Lobby.addInLobby({pseudo: pseudo, address: this.socket.handshake.address});
        this.socket.emit('gameCreated', ind - 1);
        this.updateLobby();
    }


    // Detele a game
    deleteGame(ind) {
        Lobby.deleteFromLobby(ind);

        this.updateLobby();
    }
}