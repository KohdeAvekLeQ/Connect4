// Style
import './App.scss';

// Modules
import {useState, useEffect} from 'react';
import {socket, socketReconnect} from './socket/handler.js';
import {isShortcutLocked} from './shortcutLocker.js';

// Components


// Render App
function App() {
  const [gameLaunched, setGameLaunched] = useState(false);

  // Key actions
  const keyPressHandler = (event) => {
    if (event.code === "F5" || event.code === "F11" || event.code === "F12") return;
    if (isShortcutLocked() && event.code !== "Enter") return;
    if(event.ctrlKey && event.shiftKey && (event.key === 'i' || event.key === 'I')) return;

    event.preventDefault();
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
  return (
    <div id="App">
      
    </div>
  );
}
export default App;