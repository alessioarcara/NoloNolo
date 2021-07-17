import Location from "./Location";
import classes from './Modal.module.css';

const Modal = (props) => {

    const DUMMY_LOCATIONS = [
        {
            id: 'l1',
            name: 'Campania'
        },
        {
            id: 'l2',
            name: 'Liguria'
        }
    ]

    return (
        <>
            <div className={classes.modal}>
                {DUMMY_LOCATIONS.map((place) => (
                    <Location text={place.name}/>
                ))}
            </div>
        </>
    );
};

export default Modal;