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


// On new client
io.on("connection", (socket) => {
    // Log connection
    console.log(`New Client : ${socket.handshake.address}`);
    

    // APIs
    let lobbyAPI = new LobbyAPI(socket, io);


    // On disconnection
    socket.on("disconnect", () => {
        let address = socket.handshake.address;
        console.log(`Client Disconnected : ${address}`);
    });
});

io.listen(2003);