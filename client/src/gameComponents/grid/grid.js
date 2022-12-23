// Style
import './grid.scss';

// Components
import GridCase from './gridCase/gridCase.js';


// Check includes 2D array
function check2DArray(arr, vals) {
    return arr.some(function(ele){
        return JSON.stringify(ele) === JSON.stringify(vals);
    });
}


// Comp
export default function Grid(data) {
    // ---- GAME FUNCTIONS ----
    function caseClicked(index) {
        if(data.turn === data.playerInd && !data.won) {
            // Coordonnées
            let x = index%7;
            
            if(data.grid[0][x] === null) {
                data.socket.emit('playChip', data.gameID, data.playerInd, x);
            }
        }
    }


    // ---- RENDER CASES ----
    let cases = [];
    let gridFlat = data.grid.flat(2);
    for(let i = 0; i < gridFlat.length; i++) {
        // If win case
        let win = false;
        if(data.winning.length > 0) {
            win = check2DArray(data.winning, [i%7, Math.floor(i / 7)]); // X / Y coordinates
        }

        // Add case
        cases.push(
            <GridCase key={'case_' + i} 
                color={gridFlat[i]}
                caseClicked={() => {caseClicked(i);}}
                win={win}
            />
        );
    }


    // ---- RENDER ----
    return (
        <div id="Grid">
            {cases}
        </div>
    );
}