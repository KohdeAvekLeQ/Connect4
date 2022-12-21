// Style
import './lobby.scss';

// Components
import Game from '../games/games.js';

// React
import {useState, useEffect} from 'react';


// Lobby comp
export default function Lobby(data) {
    // States
    const [games, setGames] = useState([]);

    // Effects
    useEffect(() => {
        // Socket events
        data.socket.on('setLobby', setGames);
        data.socket.emit('getLobby');

        setGames(["", "", "", "", "", "", ""]);

        // Keys
        function keyEvents(event) {
            if(event.key === "Escape") {
                data.returnToPseudo();
            }
        }
        document.addEventListener('keydown', keyEvents);


        // Cleanup
        return(() => {
            data.socket.off('setLobby', setGames);
            document.removeEventListener('keydown', keyEvents);
        });
    }, []);


    // Render games
    let gamesComp = [];
    for(let i = 0; i < games.length; i++) {
        gamesComp.push(<Game pseudo="Pseudo"/>);
    }


    // Render 
    return (
        <div id="Lobby">
            <div id="titleLobby"><span>Parties à rejoindre :</span></div>

            <div id="gamesList">
                {gamesComp}
            </div>
        </div>
    );
}