// Style
import './lobby.scss';

// Components
import Game from '../games/games.js';
import GameCreate from '../games/gameCreate.js';

// React
import {useState, useEffect} from 'react';


// Lobby comp
export default function Lobby(data) {
    // States
    const [games, setGames] = useState([]);
    const [joined, setJoined] = useState(null);

    // Effects
    useEffect(() => {
        // Socket events
        data.socket.on('setLobby', setGames);
        data.socket.on('gameCreated', setJoined);
        data.socket.emit('getLobby');

        // setGames(["", "", "", "", "", "", ""]);

        // Keys
        function keyEvents(event) {
            if(event.key === "Escape") {
                console.log(joined);
                if(joined !== null) {
                    data.socket.emit('deleteGame', joined);
                    setJoined(null);
                }
                data.returnToPseudo();
            }
        }
        document.addEventListener('keydown', keyEvents);


        // Cleanup
        return(() => {
            data.socket.off('setLobby', setGames);
            data.socket.off('gameCreated', setJoined);
            document.removeEventListener('keydown', keyEvents);
        });
    }, []);


    // ------ GAMES FUNCTIONS ------
    function joinGame(index, pseudo) {
        data.socket.emit('joinGame', index, pseudo);
    }
    function createGame() {
        data.socket.emit('createGame', data.pseudo);
    }


    // Render games
    let gamesComp = [];
    for(let i = 0; i < games.length; i++) {
        gamesComp.push(
            <Game key={'game_' + i} 
                index={i} 
                pseudo={games[i].pseudo} 
                joined={joined === i} 
                join={() => {joinGame(i, games[i].pseudo);}}
            />
        );
    }
    // Create game
    if(joined === null) gamesComp.push(<GameCreate key='game_create' create={createGame}/>);


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