// Style
import './gridCase.scss';

// Components
import Chip from '../../chip/chip.js';

// Color choices
const colors = ['yellow', 'red'];


// Grid case
export default function GridCase(data) {    
    // RENDER
    return (
        <div className='gridCaseContainer' onClick={data.caseClicked}>
            <div className={'gridCase' + (data.color === null ? '' : ' filled')}>
                <Chip color={data.color !== null ? colors[data.color] : ''}/>
            </div>
        </div>
    );
}