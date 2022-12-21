import './setPseudo.scss';

import {useEffect} from 'react';


export default function SetPseudo(data) {
    // Effects
    useEffect(() => {
        // Keys
        function keyEvents(event) {
            if(event.key === "Enter" && data.pseudo.length > 2) {
                data.validPseudo();
            }
        }
        document.addEventListener('keydown', keyEvents);


        // Cleanup
        return(() => {
            document.removeEventListener('keydown', keyEvents);
        });
    }, []);


    // Render 
    return (
        <div id="SetPseudo">
            <div id="titlePseudo"><span>Pseudo :</span></div>

            <div id="inputPseudo">
                <input 
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