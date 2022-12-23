// Style
import './endWindow.scss';


// Comp
export default function EndWindow(data) {
    // RENDER
    if(data.opened){
        return (
            <div id="EndWindow" className={data.winnerInd === 1 ? 'yellow' : 'red'}>
                <span><b>{data.winner}</b> a gagné la partie !</span>
            </div>
        );    
    }
}