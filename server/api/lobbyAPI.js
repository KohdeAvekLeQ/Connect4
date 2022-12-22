// Modules
const Lobby = require('../lobby/lobby.js');
const Game = require('../game/game.js');


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
    // Same but for all clients
    updateLobby() {
        this.io.sockets.emit('setLobby', Lobby.getLobby());
    }


    // Create game
    createGame(pseudo) {
        let id = Math.floor(Math.random() * 10000000);
        Lobby.addInLobby({pseudo: pseudo, address: this.socket.handshake.address, id: id}, this.socket);

        this.socket.emit('gameCreated', id);
        this.updateLobby();
    }


    // Detele a game
    deleteGame(id) {
        Lobby.deleteFromLobby(id);

        this.updateLobby();
    }


    // Join a created game
    joinGame(id, pseudo) {
        let [game, socketP1] = Lobby.getLobbyGame(id);

        // Game exists
        if(game !== null && !Game.checkIfExists(id)) {
            // Create new game
            let turn = Game.createGame(game.id, 
                {pseudo: game.pseudo, address: game.address}, 
                {pseudo: pseudo, address: this.socket.handshake.address}
            );

            // Del from lobby
            Lobby.deleteFromLobby(id);

            // Delete if in lobby too
            Lobby.deleteByAddress(this.socket.handshake.address);
            this.updateLobby();

            // Console
            console.log(`Game launched : ${id} | Player 1 : ${game.pseudo} | Player 2 : ${pseudo} | Turn : ${turn}`);
            
            // Send players
            socketP1.emit('gameLaunched', id, turn);
            this.socket.emit('gameLaunched', id, turn);
        }
    }
}