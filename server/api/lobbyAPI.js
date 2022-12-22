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
        this.joinGame = this.joinGame.bind(this);

        
        // Socket events
        this.socket.on('getLobby', this.getLobby);
        this.socket.on('createGame', this.createGame);
        this.socket.on('deleteGame', this.deleteGame);
        this.socket.on('joinGame', this.joinGame);
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
        let id = Math.floor(Math.random() * 10000000);
        Lobby.addInLobby({pseudo: pseudo, address: this.socket.handshake.address, id: id});

        this.socket.emit('gameCreated', id);
        this.updateLobby();
    }


    // Detele a game
    deleteGame(id) {
        Lobby.deleteFromLobby(id);

        this.updateLobby();
    }


    // Join a created game
    joinGame(id) {
        let game = Lobby.getLobbyGame(id);

        // Game exists
        if(game !== null) {
            
        }
    }
}