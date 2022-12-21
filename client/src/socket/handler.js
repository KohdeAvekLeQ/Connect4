const {io} = require("socket.io-client");
let socket = io(window.location.hostname + ":2003");

const _socket = socket;
export { _socket as socket };

socket.on("connect", () => {
    const engine = socket.io.engine;
    engine.once("upgrade", () => {
        // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
        console.log(socket.id, "Updrade transmission to : ", engine.transport.name); // in most cases, prints "websocket"
    });

    socket.on("disconnect", (reason) => {
        // else the socket will automatically try to reconnect
        if (reason === "io server disconnect") reason="Kick by the server";

        console.log("disconnect : ", reason);
        if (reason === "io client disconnect") return;
        console.log("Déconection du socket : " + reason);
    });
});

export function socketReconnect() {
    setTimeout(() => {
        socket.disconnect();
        socket.connect();
        console.log("socket reconnection");
    }, 1); //1ms is enough to force the call after the popup
}
