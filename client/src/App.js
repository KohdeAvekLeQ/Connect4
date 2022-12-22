// Style
import './App.scss';

// Modules
import {useState, useEffect} from 'react';
import {socket, socketReconnect} from './socket/handler.js';
import {isShortcutLocked} from './shortcutLocker.js';

// Components
import Lobby from './lobbyComponents/lobby/lobby.js';
import SetPseudo from './lobbyComponents/setPseudo/setPseudo.js';
import Grid from './gameComponents/grid/grid.js';
import Player from './gameComponents/player/player.js';


// Render App
function App() {
  // STATES
  const [gameState, setGameState] = useState(2);      // 0 : pseudo sel / 1 : lobby / 2 : in game
  const [pseudo, setPseudo] = useState("Pseudo1");    // Pseudo

  const [gamePlayed, setGamePlayed] = useState(null); // Game in progress or not (contains game id)
  const [turn, setTurn] = useState(null);             // Turn of the game
  const [pseudo2, setPseudo2] = useState("Pseudo2");  // Pseudo of adv
  const [playerInd, setPlayerInd] = useState(1)    // Player index (1/2)


  // EFFECTS
  useEffect(() => {
    // Socket functions
    function onGameJoined(id, turn) {
      setGamePlayed(id);
      setGameState(2);
      setTurn(turn);
    } 

    // Socket events
    socket.on('gameLaunched', onGameJoined);
  

    // Keys
    const keyPressHandler = (event) => {
      if (event.code === "F5" || event.code === "F11" || event.code === "F12") return;
      if (isShortcutLocked() && event.code !== "Enter") return;
      if(event.ctrlKey && event.shiftKey && (event.key === 'i' || event.key === 'I')) return;
    };
    document.addEventListener("keydown", keyPressHandler);


    // Before unload event
    const unloadWarning = (event) => {
      let message = "Êtes vous sûr de vouloir fermer la page ?"
      socketReconnect();
      event.returnValue = message;
      return message;
    };
    window.addEventListener("beforeunload", unloadWarning);


    // Cleanup on end
    return function cleanup() {
      // Socket
      socket.off('gameLaunched', onGameJoined);

      // Keys / Unload
      document.removeEventListener("keydown", keyPressHandler);
      window.removeEventListener("beforeunload", unloadWarning);
    };
  });


  // RENDER
  if(gameState === 0) { // PSEUDO
    return (
      <div id="App">
        <div id="blurWind"></div>
  
        <SetPseudo pseudo={pseudo} setPseudo={setPseudo} validPseudo={() => {setGameState(1);}}/>
      </div>
    );
  } else if(gameState === 1) { // LOBBY
    return (
      <div id="App">
        <div id="blurWind"></div>
  
        <Lobby pseudo={pseudo} socket={socket} returnToPseudo={() => {setGameState(0);}}/>
      </div>
    );
  } else { // IN GAME
    return (
      <div id="App">
        <div id="blurWind"></div>

        <Grid/>
        
        <Player ind={1} self={playerInd === 1} pseudo={playerInd === 1 ? pseudo : pseudo2}/>
        <Player ind={2} self={playerInd === 2} pseudo={playerInd === 2 ? pseudo : pseudo2}/>
      </div>
    );
  }
}
export default App;