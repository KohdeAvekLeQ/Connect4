// Style
import './endWindow.scss';


// Comp
export default function EndWindow(data) {
    // WIN ELEMENT
    let textElem = data.winnerInd > 0 ? 
        <span><b>{data.winner}</b> a gagné la partie !</span> 
        : <span><b>Egalité !</b></span>
    
    // RENDER
    if(data.opened){
        return (
            <div id="EndWindow" className={(data.winnerInd === 1 ? 'yellow' : (data.winnerInd === 0 ? '' : 'red'))}>
                {textElem}
            </div>
        );    
    }
}