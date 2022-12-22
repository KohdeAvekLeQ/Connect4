import './games.scss';


// Create Game comp
export default function GameCreate(data) {
    // Render 
    return (
        <div className="Game">
            <div className='gamePlayer'><span>Nouvelle partie</span></div>

            <div className="createGame">
                <button onClick={data.create}>+</button>
            </div>
        </div>
    );
}