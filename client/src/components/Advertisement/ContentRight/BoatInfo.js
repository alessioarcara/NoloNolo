import RegionIcon from "../../UI/icons/RegionIcon";
import classes from "./BoatInfo.module.css";
import CityIcon from "../../UI/icons/CityIcon";

const BoatInfo = ({model, place}) => {
    return (
        <>
            {/* Content boat model */}
            <div className={classes['boat-title']}>{model}</div>
            {/* Content place and harbour */}
            <div className={classes['content-harbour']}>
                <RegionIcon/>
                <span className={classes['place-text']}>{place.harbour}</span>
            </div>
            <div className={classes['content-place']}>
                <CityIcon/>
                <span className={classes['place-text']}>{`${place.city}, ${place.region}`}</span>
            </div>
            <hr/>
        </>
    );
}

export default BoatInfo;