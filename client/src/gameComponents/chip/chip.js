// Style 
import './chip.scss';

export default function Chip(data) {
    // RENDER
    return (
        <div className={'Chip ' + data.color}>
            <div className={'innerCircle ' + data.color}></div>
        </div>
    );
}