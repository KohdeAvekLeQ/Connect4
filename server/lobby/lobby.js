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
    return lobby.filter(lb => lb.id === id)[0];
} exports.getLobbyGame = getLobbyGame;

// Delete from lobby
function deleteFromLobby(ind) {
    lobby.splice(ind, 1);
} exports.deleteFromLobby = deleteFromLobby;