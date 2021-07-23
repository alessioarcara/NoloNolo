import Location from "./Location";
import classes from './Modal.module.css';
import Modal from "../UI/Modal/Modal";

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

const Search = () => {
    return (
        <Modal fullscreen className={classes.modal}>
            {DUMMY_LOCATIONS.map(place =>
                <Location text={place.name}/>)
            }
        </Modal>
    );
};

export default Search;
