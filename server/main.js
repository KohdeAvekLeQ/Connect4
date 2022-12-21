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


// On new client
io.on("connection", (socket) => {
    // Log connection
    console.log(`New Client : ${socket.handshake.address}`);
    
    
    

    // ------ EVENTS ------
    
    // --------------------


    // On disconnection
    socket.on("disconnect", () => {
        let address = socket.handshake.address;
        console.log(`Client Disconnected : ${address}`);
    });
});

io.listen(2003);