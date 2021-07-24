import Location from "./Location";
import Modal from "../../UI/Modal/Modal";
import {useEffect, useState} from "react";
import SearchDatePicker from "./SearchDatePicker";
import Button from "../../UI/Button/Button";

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
    const [isNextPage, setNextPage] = useState(false)

    const clickHandler = () => {
        setNextPage(prevState => !prevState)
    }

    useEffect(() => {
        searchRef.current.focus();
    }, [searchRef])

    return (
        <Modal fullScreen={true}>
            {!isNextPage &&
            <>
                {children}
                {DUMMY_LOCATIONS.map(place =>
                    <Location
                        onClick={clickHandler}
                        key={place.id}
                        text={place.name}/>)
                }
            </>
            }
            {isNextPage &&
            <>
                <SearchDatePicker/>
                <Button onClick={clickHandler} type="button">Torna indietro</Button>
            </>
            }
        </Modal>
    );
}
;

export default Search;
