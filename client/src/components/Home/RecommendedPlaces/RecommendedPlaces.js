import PlaceCard from "./PlaceCard";
import classes from './RecommendedPlaces.module.css';

const RecommendedPlaces = () => {
    const DUMMY_LOCATION = [
        {
            id: 'l1',
            text: 'Campania'
        },
        {
            id: 'l2',
            text: 'Liguria'
        },
        {
            id: 'l3',
            text: 'Sardegna'
        },
        {
            id: 'l4',
            text: 'Sicilia'
        },
        {
            id: 'l5',
            text: 'Toscana'
        }
    ]

    return (
        <>
            <div className="subtitle">Naviga nelle nostre località</div>
            <div className={classes.list}>
                {DUMMY_LOCATION.map(place =>
                    <PlaceCard
                        key={place.id}
                        id={place.id}
                        text={place.text}
                        image={place.image}
                    />
                )}
            </div>
        </>
    );
};

export default RecommendedPlaces;
