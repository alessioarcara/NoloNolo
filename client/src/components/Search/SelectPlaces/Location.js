import React from "react";
import classes from './Location.module.css';
import RegionIcon from "../../UI/icons/RegionIcon";
import CityIcon from "../../UI/icons/CityIcon";


const Location = ({moveClickHandler, city, region}) => {
    return (
        <div className={classes.places}>
            {city ? <CityIcon/> : <RegionIcon/>}
            <div onClick={moveClickHandler.bind(this, city, region)}>
                {city ? `${city}, ${region}` : `${region}`}
            </div>
        </div>
    )
}

export default React.memo(Location);
