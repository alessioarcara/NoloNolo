import PageHeader from "../components/UI/PageHeader/PageHeader";
import Location from "../components/SearchPage/Location";

const SearchPage = () => {
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
            <PageHeader/>
            {DUMMY_LOCATIONS.map((place) => (
                <Location text={place.name}/>
            ))}
        </>
    );
};

export default SearchPage;
