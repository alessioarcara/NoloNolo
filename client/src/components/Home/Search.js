import Location from "./Location";
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
        <Modal fullScreen={true}>
            {DUMMY_LOCATIONS.map(place =>
                <Location
                    key={place.id}
                    text={place.name}/>)
            }
        </Modal>
    );
};

export default Search;
