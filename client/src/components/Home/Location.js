import classes from './Location.module.css';
import LocationIcon from "../UI/icons/LocationIcon";

const Location = props => {
    return (
        <div className={classes.places}>
            <LocationIcon/>
            <div>{props.text}</div>
        </div>
    );
};


export default Location;
