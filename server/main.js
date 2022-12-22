// Dependencies
const {Server} = require('socket.io');

// IO Server
const io = new Server({
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    serveClient: false
});


// API
const LobbyAPI = require('./api/lobbyAPI.js');
const Lobby = require('./lobby/lobby.js');


// On new client
io.on("connection", (socket) => {
    // Log connection
    console.log(`New Client : ${socket.handshake.address}`);
    

    // APIs
    let lobbyAPI = new LobbyAPI(socket, io);


    // On disconnection
    socket.on("disconnect", () => {
        // Disconnect msg
        let address = socket.handshake.address;
        console.log(`Client Disconnected : ${address}`);

        // Delete if in lobby
        Lobby.deleteByAddress(address);
        lobbyAPI.updateLobby();
    });
});

io.listen(2003);