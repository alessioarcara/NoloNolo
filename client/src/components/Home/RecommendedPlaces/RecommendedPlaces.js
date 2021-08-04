import PlaceCard from "./PlaceCard";
import classes from './RecommendedPlaces.module.css';


const places = ['Campania', 'Liguria', 'Sardegna', 'Sicilia', 'Toscana', 'Puglia']

const RecommendedPlaces = () => {
    return (
        <>
            <div className="subtitle">Naviga nelle nostre località</div>
            <div className={classes.list}>
                {places.map((place, index) => (
                    <PlaceCard
                        key={index}
                        title={place}
                    />)
                )}
            </div>
        </>
    );
};

export default RecommendedPlaces;
