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
        wins: [##, ##] // Wins history : player 1 [0] / player 2 [1]
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
}

// ---- UTILITARY ----
// Get game by ID
function getGameIndex(id) {
    return games.findIndex(g => g.id === id);
}
function checkIfExists(id) {
    return allIDs.includes(id);
} exports.checkIfExists = checkIfExists;


// ---- CREATION / DELETION ----
// Create new game
function createGame(id, pl1, pl2) {
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
        wins: [0, 0]
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
