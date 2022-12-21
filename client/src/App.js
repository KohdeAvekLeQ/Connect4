// Style
import './App.scss';

// Modules
import {useState, useEffect} from 'react';
import {socket, socketReconnect} from './socket/handler.js';
import {isShortcutLocked} from './shortcutLocker.js';

// Components
import Lobby from './lobbyComponents/lobby/lobby.js';
import SetPseudo from './lobbyComponents/setPseudo/setPseudo.js';


// Render App
function App() {
  // States
  const [gameState, setGameState] = useState(0); // 0 : pseudo sel / 1 : lobby / 2 : in game
  const [pseudo, setPseudo] = useState("");


  // Key actions
  const keyPressHandler = (event) => {
    if (event.code === "F5" || event.code === "F11" || event.code === "F12") return;
    if (isShortcutLocked() && event.code !== "Enter") return;
    if(event.ctrlKey && event.shiftKey && (event.key === 'i' || event.key === 'I')) return;
  };
  // Warning on unload
  const unloadWarning = (event) => {
      let message = "Êtes vous sûr de vouloir fermer la page ?"
      socketReconnect();
      event.returnValue = message;
      return message;
  };
  // Events
  useEffect(() => {
      document.addEventListener("keydown", keyPressHandler);
      window.addEventListener("beforeunload", unloadWarning);

      return function cleanup() {
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

  }
}
export default App;