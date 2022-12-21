import './games.scss';


// Games comp
export default function Game(data) {
    // Render 
    return (
        <div className="Game">
            <div className='gamePlayer'><span>{data.pseudo}</span></div>

            <div className="joinGame">
                <button>Rejoindre la partie</button>
            </div>
        </div>
    );
}