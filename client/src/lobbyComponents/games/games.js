import './games.scss';


// Games comp
export default function Game(data) {
    // Button text
    let btnText = data.joined ? 'Votre partie' : 'Rejoindre la partie';
    
    // Event on double click
    let event = data.joined ? data.leaveGame : () => {};


    // Render 
    return (
        <div className={"Game" + (data.joined ? ' joined' : '')} onDoubleClick={event}>
            <div className='gamePlayer'><span>{data.pseudo}</span></div>

            <div className="joinGame">
                <button 
                    disabled={data.joined} 
                    onClick={data.join} 
                >{btnText}</button>
            </div>
        </div>
    );
}