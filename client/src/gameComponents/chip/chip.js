// Style 
import './chip.scss';

export default function Chip(data) {
    if(data.color !== '') {
        // RENDER
        return (
            <div className={'Chip ' + data.color}>
                <div className={'innerCircle ' + data.color}></div>
            </div>
        );
    }
}