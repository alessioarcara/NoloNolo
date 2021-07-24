import Location from "./Location";
import Modal from "../../UI/Modal/Modal";
import {useEffect} from "react";
import SearchDatePicker from "./SearchDatePicker";
import classes from "./SearchDatePicker.css"

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

const Search = ({children, searchRef}) => {

    useEffect(() => {
        searchRef.current.focus();
    }, [])

    return (
        <Modal fullScreen={true}>
            {children}
            {DUMMY_LOCATIONS.map(place =>
                <Location
                    key={place.id}
                    text={place.name}/>)
            }
            <SearchDatePicker className={classes.myClassname}/>
        </Modal>
    );
};

export default Search;
