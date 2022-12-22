let lobby = [];
let sockets = [];


// Get games lobby
function getLobby() {
    return lobby;
} exports.getLobby = getLobby;

// Add game in lobby
function addInLobby(game, socket) {
    sockets.push(socket);
    lobby.push(game);
} exports.addInLobby = addInLobby;

// Get game by id
function getLobbyGame(id) {
    let ind = lobby.findIndex(lb => lb.id === id);
    
    if(ind !== -1) {  
        return [lobby[ind], sockets[ind]];
    } else {
        return [null, null];
    }
} exports.getLobbyGame = getLobbyGame;

// Delete from lobby
function deleteFromLobby(id) {
    let ind = lobby.findIndex(lb => lb.id === id);
    if(ind !== -1) {
        lobby.splice(ind, 1);
        sockets.splice(ind, 1);
    }
} exports.deleteFromLobby = deleteFromLobby;

// Check by address
function deleteByAddress(add) {
    let ind = lobby.findIndex(lb => lb.address === add);

    if(ind > -1) {
        console.log(`Removed from lobby : ${add} (ID: ${lobby[ind].id})`);
        lobby.splice(ind, 1);
        sockets.splice(ind, 1);
    }
} exports.deleteByAddress = deleteByAddress;