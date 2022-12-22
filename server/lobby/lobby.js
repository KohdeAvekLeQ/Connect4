let lobby = [];


// Get games lobby
function getLobby() {
    return lobby;
} exports.getLobby = getLobby;

// Add game in lobby
function addInLobby(game) {
    return lobby.push(game);
} exports.addInLobby = addInLobby;

// Get game by id
function getLobbyGame(id) {
    let g = lobby.filter(lb => lb.id === id);
    
    if(g.length > 0) {  
        return g[0];
    } else {
        return null;
    }
} exports.getLobbyGame = getLobbyGame;

// Delete from lobby
function deleteFromLobby(id) {
    let ind = lobby.findIndex(lb => lb.id === id);
    if(ind !== -1) {
        lobby.splice(ind, 1);
    }
} exports.deleteFromLobby = deleteFromLobby;

// Check by address
function deleteByAddress(add) {
    let ind = lobby.findIndex(lb => lb.address === add);

    if(ind > -1) {
        lobby.splice(ind, 1);
        console.log(`Removed from lobby : ${add}`);
    }
} exports.deleteByAddress = deleteByAddress;