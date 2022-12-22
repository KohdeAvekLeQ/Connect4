// Style
import './setPseudo.scss';

// React
import {useEffect} from 'react';
import useKeypress from 'react-use-keypress';


export default function SetPseudo(data) {
    // EFFECT
    useEffect(() => {
        setTimeout(() => {
            document.getElementById('inputPseudo').focus();
        }, 0);
    }, []);

    // KEYS
    useKeypress('Enter', () => {
        if(data.pseudo.length > 2) {
            data.validPseudo();
        }
    });


    // Render 
    return (
        <div id="SetPseudo">
            <div id="titlePseudo"><span>Pseudo :</span></div>

            <div id="inputPseudoDiv">
                <input 
                    id="inputPseudo"
                    type='text' 
                    placeholder='Entrez votre pseudo'
                    value={data.pseudo}
                    onChange={(event) => {data.setPseudo(event.target.value);}}
                ></input>
            </div>
 
            <div id="validPseudo">
                <button disabled={data.pseudo.length < 3} onClick={data.validPseudo}>VALIDER</button>
            </div>
        </div>
    );
}