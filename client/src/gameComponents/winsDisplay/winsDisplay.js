// Style 
import './winsDisplay.scss';


// Comp
export default function WinsDisplay(data) {
    // RENDER
    return (
        <div id="WinsDisplay">
            <div id="winsTitle">Victoires :</div>   

            <div className='playerWinDiv yellow'>
                <div className='playerNameWin'>{data.pseudo}</div>

                <div className='playerWins'>{data.wins[0]}</div>
            </div>

            <div className='playerWinDiv'>
                <div className='playerNameWin'>{data.pseudo2}</div>

                <div className='playerWins'>{data.wins[1]}</div>
            </div>
        </div>
    );
}