import classes from './Location.module.css';
import LocationIcon from "../../UI/icons/LocationIcon";


const Location = ({onClick, city, region}) => {
    return (
        <div className={classes.places}>
            <LocationIcon/>
            <div onClick={onClick}>{city ? city : region}</div>
        </div>
    );
};

export default Location;
