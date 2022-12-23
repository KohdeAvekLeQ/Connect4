// Style
import './grid.scss';

// Components
import GridCase from './gridCase/gridCase.js';


// Comp
export default function Grid(data) {
    // ---- GAME FUNCTIONS ----
    function caseClicked(index) {
        console.log(`PlayerID: ${data.playerInd} | Turn: ${data.turn}`);
        if(data.turn === data.playerInd) {
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
        // Add case
        cases.push(
            <GridCase key={'case_' + i} 
                color={gridFlat[i]}
                caseClicked={() => {caseClicked(i);}}
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