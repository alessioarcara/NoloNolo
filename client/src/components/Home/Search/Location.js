import classes from './Location.module.css';
import RegionIcon from "../../UI/icons/RegionIcon";
import CityIcon from "../../UI/icons/CityIcon";


const Location = props => {
    if (props.textCity === null) {
        return (
            <div className={classes.places}>
                <RegionIcon/>
                <div onClick={props.onClick}>{props.textRegion}</div>
            </div>
        );
    }
    else {
        return (
            <div className={classes.places}>
                <CityIcon/>
                <div onClick={props.onClick}>{props.textCity}, {props.textRegion}</div>
            </div>
        );
    }
}

export default Location;