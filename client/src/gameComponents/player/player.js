// Style
import './player.scss';

// Comps
import Chip from '../chip/chip.js';


// Comp
export default function Player(data) {
    // Position
    let side = data.ind === 1 ? ' left' : ' right';


    // RENDER
    return (
        <div className={"Player" + side}>
            <div className={'playerPseudo' + (data.self ? ' self' : '')}>
                <span>{data.pseudo}</span>
            </div>

            <div className='chipDiv'>
                <Chip color={data.ind === 1 ? 'yellow' : 'red'}/>
            </div>
        </div>
    );
}