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
        this.sendLobbyChat = this.sendLobbyChat.bind(this);

        
        // Socket events
        this.socket.on('getLobby', this.getLobby);
        this.socket.on('createGame', this.createGame);
        this.socket.on('deleteGame', this.deleteGame);
        this.socket.on('joinGame', this.joinGame);
        this.socket.on('sendLobbyChat', this.sendLobbyChat);
    }


    // Get Lobby
    getLobby() {
        this.socket.emit('setLobby', Lobby.getLobby());
        this.socket.emit('setLobbyChat', Lobby.getChat());
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
                {pseudo: game.pseudo, address: game.address},  // PLayer 1
                {pseudo: pseudo, address: this.socket.handshake.address}, // Player 2
                [socketP1, this.socket]
            );

            // Del from lobby
            Lobby.deleteFromLobby(id);

            // Delete if in lobby too
            Lobby.deleteByAddress(this.socket.handshake.address);
            this.updateLobby();

            // Console
            console.log(`Game launched : ${id} | Player 1 : ${game.pseudo} | Player 2 : ${pseudo} | Turn : ${turn}`);
            
            // Send players informations
            socketP1.emit('gameLaunched', id, turn, pseudo, 1);
            socketP1.emit('setGrid', Game.emptyBoard());
            socketP1.emit('setWins', [0, 0]);

            this.socket.emit('gameLaunched', id, turn, game.pseudo, 2);
            this.socket.emit('setGrid', Game.emptyBoard());
            this.socket.emit('setWins', [0, 0]);
        }
    }


    // Send lobby chat
    sendLobbyChat(pseudo, message) {
        let chat = Lobby.addMessage(pseudo, message);
        this.io.sockets.emit('setLobbyChat', chat);
    }
}