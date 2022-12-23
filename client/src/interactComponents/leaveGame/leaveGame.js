// Style 
import './leaveGame.scss';


// Leave game comp
export default function LeaveGame(data) {
    // RENDER
    return (
        <div id="LeaveGame" onClick={data.click}>
            <span>Quitter</span>
        </div>
    );
}