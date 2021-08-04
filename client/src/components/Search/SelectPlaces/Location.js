import classes from './Location.module.css';
import RegionIcon from "../../UI/icons/RegionIcon";
import CityIcon from "../../UI/icons/CityIcon";


const Location = ({onClick, city, region}) => {
    return (
        <div className={classes.places}>
            {city ? <CityIcon/> : <RegionIcon/>}
            <div onClick={onClick}>
                {city ? `${city}, ${region}` : `${region}`}
            </div>
        </div>
    )
}

export default Location;
