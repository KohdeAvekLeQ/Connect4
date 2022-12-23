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
        sockets: [],
        totalCases: #  // Total of cases placed
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
        sockets: scks,
        totalCases: 0
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
        games[index].totalCases++;
        return true;
    } else {
        return false;
    }
} exports.playChip = playChip;

function checkWin(gameID) {
    let bd = games[getGameIndex(gameID)].board;

    // TEST board
    let found = false;
    let coord = [];
    let colWin = null;
    
    // ---- Test horizontal ----
    for(let y = 0; y < bd.length; y++) {
        // For each x possible
        for(let x = 0; x < 4; x++) {
            if(bd[y][x] === null) {continue};
            
            // Color to test
            let color = bd[y][x];

            // For all x + xp
            for(let xp = 1; xp < 4; xp++) {
                let col = bd[y][x + xp];
                if(col === null || col !== color) break;
                
                if(xp === 3 && col === color) {
                    found = true;
                    
                    // Add all coordinates in coords
                    for(let i = 1; i < 4; i++) {
                        coord.push([x + i, y]);
                    }

                    break;
                }
            }

            // If found
            if(found) {
                coord.push([x, y]);
                colWin = color;
                break;
            }
        }

        // If found
        if(found) break;
    }
    if(found) return [true, colWin, coord];


    // ---- Test vertical ----
    for(x = 0; x < bd[0].length; x++) {
        // For all y possible
        for(let y = 0; y < 3; y++) {
            if(bd[y][x] === null) {continue};
            
            // Color to test
            let color = bd[y][x];

            // For all y + yp
            for(let yp = 1; yp < 4; yp++) {
                let col = bd[y + yp][x];
                if(col === null || col !== color) break;
                
                if(yp === 3 && col === color) {
                    found = true;

                    // Add all coordinates in coords
                    for(let i = 1; i < 4; i++) {
                        coord.push([x, y + i]);
                    }
                    
                    break;
                }
            }

            // If found
            if(found) {
                coord.push([x, y]);
                colWin = color;
                break;
            }
        }

        // If found 
        if(found) break;
    }
    if(found) return [true, colWin, coord];


    // ---- Test diagonal 1 ----
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 4; x++) {
            // Case colored
            if (bd[y][x] !== null) {
                let col = bd[y][x];

                // Diagonal valid
                if (bd[y + 1][x + 1] === col && bd[y + 2][x + 2] === col && bd[y + 3][x + 3] === col) {
                    found = true;
                    
                    // Adding coordinates
                    coord.push([x, y]);
                    for(let i = 1; i < 4; i++) {
                        coord.push([x + i, y + i]);
                    }
                    colWin = col;
                    break;
                }
            }
        }

        // Break if found 
        if(found) break;
    }
    if(found) return [true, colWin, coord];


    // ---- Test diagonal 2 ----
    for (let y = 0; y < 3; y++) {
        for (let x = 6; x > 2; x--) {
            // Case colored
            if (bd[y][x] !== null) {
                let col = bd[y][x];

                if (bd[y + 1][x - 1] === col && bd[y + 2][x - 2] === col && bd[y + 3][x - 3] === col) {
                    found = true;

                    // Adding coordinates
                    coord.push([x, y]);
                    for(let i = 1; i < 4; i++) {
                        coord.push([x - i, y + i]);
                    }
                    colWin = col;
                    break;
                }
            }
        }

        // Break if found 
        if(found) break;
    }


    // Result 
    return [found, colWin, coord];
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
    // Game
    let index = getGameIndex(gameID);
    let g = games[index];

    // If end w/o win
    if(g.totalCases >= 42) {
        // Send update
        for(let i = 0; i < g.sockets.length; i++) {
            g.sockets[i].emit('gameEquality');
        }
    } else {
        // Check for win
        let [win, winner, coords] = checkWin(gameID); // /!\ winner is 0 / 1

        // If end
        if(win) {
            // Increment win score
            games[index].wins[winner]++;

            // Send win event
            for(let i = 0; i < g.sockets.length; i++) {
                g.sockets[i].emit('setGrid', g.board);
                g.sockets[i].emit('gameWon', winner + 1, coords);
                g.sockets[i].emit('setWins', games[index].wins);
            }
        } else {
            // Send update
            for(let i = 0; i < g.sockets.length; i++) {
                g.sockets[i].emit('setGrid', g.board);
                g.sockets[i].emit('setTurn', g.turn);
            }
        }
    }    
} exports.updateGame = updateGame;

function resetForNextGame(gameID) {
    let index = getGameIndex(gameID);

    // Turn
    let ranTurn = Math.floor(Math.random() * 2) + 1;

    // Reset vars
    games[index].board = emptyBoard();
    games[index].turn = ranTurn;
    games[index].totalCases = 0;

    return ranTurn;    
} exports.resetForNextGame = resetForNextGame;