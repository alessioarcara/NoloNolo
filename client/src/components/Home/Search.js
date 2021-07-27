import Location from "./Location";
// import classes from './Search.module.css';

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
        <>
            {DUMMY_LOCATIONS.map(place =>
                <Location
                    key={place.id}
                    text={place.name}/>)
            }
        </>
    );
};

export default Search;
