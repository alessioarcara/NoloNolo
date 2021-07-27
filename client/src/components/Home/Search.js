import Location from "./Location";
import {useEffect} from "react";

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
    }, [searchRef])

    return (
        <>
            {children}
            {DUMMY_LOCATIONS.map(place =>
                <Location
                    key={place.id}
                    text={place.name}/>)
            }
        </>
    );
};

export default Search;
