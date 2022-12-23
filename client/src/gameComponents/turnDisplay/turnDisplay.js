// Style 
import './turnDisplay.scss';


// Turn comp
export default function TurnDisplay(data) {
    // TEXT TO DISPLAY
    let textToDisp = data.playerInd === data.turn ? "C'est à votre tour de jouer !" : "C'est à l'adversaire de jouer !";
    

    // RENDER
    return (
        <div id="TurnDisplay" 
            className={(data.playerInd === data.turn ? 'self' : 'other') + (data.playerInd === 1 ? ' yellow' : ' red')}>
            <span>{textToDisp}</span>
        </div>
    );
}