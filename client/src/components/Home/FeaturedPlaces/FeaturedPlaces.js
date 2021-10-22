import PlaceCard from "./PlaceCard";
import classes from './FeaturedPlaces.module.css';
import {useCallback, useState} from "react";
import {circularSlice} from "../../../helpers/utils";
import LeftArrowIcon from "../../UI/icons/LeftArrowIcon";
import RightArrowIcon from "../../UI/icons/RightArrowIcon";


const places = ['Campania', 'Liguria', 'Sardegna', 'Sicilia', 'Toscana', 'Puglia']

const FeaturedPlaces = () => {
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(places.length - 1)

    const leftClickHandler = useCallback(() => {
        setStart(prevState => prevState === 0 ? places.length - 1 : prevState - 1)
        setEnd(prevState => prevState === 0 ? places.length - 1 : prevState - 1)
    }, [])

    const rightClickHandler = useCallback(() => {
        setStart(prevState => (prevState + 1 % places.length + places.length) % places.length)
        setEnd(prevState => (prevState + 1 % places.length + places.length) % places.length)
    }, [])

    return (
        <section>
            <div className="subtitle">Naviga nelle nostre località</div>
            <div
                className={classes.list}>
                {circularSlice(places, start, end).map((place, index) => (
                    <PlaceCard
                        key={index}
                        title={place}
                    />)
                )}
                <div onClick={leftClickHandler} className={classes['left-button']}><LeftArrowIcon/></div>
                <div onClick={rightClickHandler} className={classes['right-button']}><RightArrowIcon/></div>
            </div>
        </section>
    );
};

export default FeaturedPlaces;
