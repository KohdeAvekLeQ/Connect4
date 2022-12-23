let games = [];
let allIDs = [];
/*
    Format of games :
    {
        id: ########
        player1: {pseudo: "", address: ""},
        player2: {pseudo: "", address: ""},
        board: [[]] // [y][x] -> null / 0 / 1 (0 = yellow / 1 = red),
        turn: # // 1 / 2,
        chat: [{exp: #, msg: ""}]  // exp : 1 / 2,
        wins: [##, ##] // Wins history : player 1 [0] / player 2 [1],
        sockets: []
    }
*/

// Create an empty board
function emptyBoard() {
    let bd = [];
    for(let y = 0; y < 6; y++) {
        bd.push([]);
        for(let x = 0; x < 7; x++) {
            bd[y].push(null);
        }
    }
    return bd;
} exports.emptyBoard = emptyBoard;

// ---- UTILITARY ----
// Get game by ID
function getGameIndex(id) {
    return games.findIndex(g => g.id === id);
} exports.getGameIndex = getGameIndex;

function checkIfExists(id) {
    return allIDs.includes(id);
} exports.checkIfExists = checkIfExists;

function maxHeight(board, x) {
    let max = 6;
    for(let i = 0; i < board.length; i++) {
        let ind = 5 - i;
        if(board[ind][x] === null) {
            max = ind + 1;
            break;
        }
    }

    return max;
}


// ---- CREATION / DELETION ----
// Create new game
function createGame(id, pl1, pl2, scks) {
    // Random turn
    let ranTurn = Math.floor(Math.random() * 2) + 1;

    // Add in lists
    games.push({
        id: id,
        player1: pl1,
        player2: pl2,
        board: emptyBoard(),
        turn: ranTurn,
        chat: [],
        wins: [0, 0],
        sockets: scks
    });
    allIDs.push(id);

    // Return turn
    return ranTurn;
} exports.createGame = createGame;

// Del game
function deleteGame(id) {
    games.splice(getGameIndex(id), 1);
} exports.deleteGame = deleteGame;


// ---- IN GAME FUNCTIONS ----
function getTurn(gameID) {
    return games[getGameIndex(gameID)].turn;
} exports.getTurn = getTurn;

function playChip(gameID, playerID, x){
    let index = getGameIndex(gameID);
    let g = games[index];

    // Chip placeable
    let max = maxHeight(g.board, x);
    if(max > 0) {
        games[index].board[max - 1][x] = playerID - 1;
        games[index].turn = (games[index].turn === 1 ? 2 : 1);
        return true;
    } else {
        return false;
    }
} exports.playChip = playChip;

function checkWin(gameID) {
    return [false, null];
}


// ---- MESSAGES ----
function addMessage(gameID, pseudo, message) {
    games[getGameIndex(gameID)].chat.push({
        sender: pseudo,
        content: message
    });

    // Send new chat
    let g = games[getGameIndex(gameID)];

    return [g.chat, g.sockets];
} exports.addMessage = addMessage;


// ---- UPDATE ----
function updateGame(gameID) {
    // Check for win
    let [win, winner] = checkWin(gameID);

    // If end
    if(win) {

    } else {
        // Send update
        let g = games[getGameIndex(gameID)];
        for(let i = 0; i < g.sockets.length; i++) {
            g.sockets[i].emit('setGrid', g.board);
            g.sockets[i].emit('setTurn', g.turn);
        }
    }    
} exports.updateGame = updateGame;