import PlaceCard from "./PlaceCard";
import classes from './RecommendedPlaces.module.css';

const RecommendedPlaces = () => {
    const DUMMY_LOCATION = [
        {
            id: 'l1',
            title: 'Campania'
        },
        {
            id: 'l2',
            title: 'Liguria'
        },
        {
            id: 'l3',
            title: 'Sardegna'
        },
        {
            id: 'l4',
            title: 'Sicilia'
        },
        {
            id: 'l5',
            title: 'Toscana'
        },
        {
            id: 'l6',
            title: 'Puglia'
        }
    ]

    return (
        <>
            <div className="subtitle">Naviga nelle nostre località</div>
            <div className={classes.list}>
                {DUMMY_LOCATION.map(place =>
                    <PlaceCard
                        key={place.id}
                        title={place.title}
                    />
                )}
            </div>
        </>
    );
};

export default RecommendedPlaces;
