// Style
import './lobby.scss';

// Components
import Game from '../games/games.js';
import GameCreate from '../games/gameCreate.js';

// React
import {useState, useEffect} from 'react';
import useKeypress from 'react-use-keypress';


// Lobby comp
export default function Lobby(data) {
    // ------ STATES ------
    const [games, setGames] = useState([]);
    const [joined, setJoined] = useState(null);


    // ------ EFFECTS ------
    useEffect(() => {
        // Socket events
        data.socket.on('setLobby', setGames);
        data.socket.on('gameCreated', setJoined);
        data.socket.emit('getLobby');

        // setGames(["", "", "", "", "", "", ""]);

        // Cleanup
        return(() => {
            data.socket.off('setLobby', setGames);
            data.socket.off('gameCreated', setJoined);
        });
    }, []);


    // ------ GAMES FUNCTIONS ------
    function joinGame(id) {
        data.socket.emit('joinGame', id, data.pseudo);
    }
    function createGame() {
        data.socket.emit('createGame', data.pseudo);
    }
    function deleteGame() {
        if(joined !== null) {
            data.socket.emit('deleteGame', joined);
            setJoined(null);
        }
    }


    // ------ KEYS ------
    useKeypress('Escape', () => {
        deleteGame();
        data.returnToPseudo();
    });


    // ------ RENDER GAMES ------
    let gamesComp = [];
    for(let i = 0; i < games.length; i++) {
        let game = games[i];

        gamesComp.push(
            <Game key={'game_' + i} 
                id={game.id} 
                pseudo={game.pseudo} 
                joined={joined === game.id} 
                join={() => {joinGame(game.id);}}
                leaveGame={deleteGame} 
            />
        );
    }
    // Create game
    if(joined === null) gamesComp.push(<GameCreate key='game_create' create={createGame}/>);


    // ------ RENDER ------ 
    return (
        <div id="Lobby">
            <div id="titleLobby"><span>Parties à rejoindre :</span></div>

            <div id="gamesList">
                {gamesComp}
            </div>
        </div>
    );
}