// Style
import './validWindow.scss';

// React
import useKeyPress from 'react-use-keypress';


// Valid window comp
export default function ValidWindow(data) {
    // ---- FUNCTIONS ----
    function close() {
        data.close();
    }

    function valid() {
        data.socket.emit('leaveGame', data.gameID);
        close();
    }


    // ---- KEYS ----
    useKeyPress(['Enter', 'Escape'], (event) => {
        if(event.key === 'Escape') {
            close();
        } else {
            valid();
        }
    });


    // ---- RENDER ----
    if(data.opened) {
        return (
            <div id="ValidWindow">
                <div id="validText">
                    <span>Voulez vous vraiment quitter la partie ?</span>
                </div>

                <div id="validBtns">
                    <button onClick={valid}>Valider</button>
                    <button onClick={close} className='cancel'>Annuler</button>
                </div>
            </div>
        );
    }
}