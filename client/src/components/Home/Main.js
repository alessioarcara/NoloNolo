import React from "react";
import classes from "./Main.module.css";
import FeaturedPlaces from "./FeaturedPlaces/FeaturedPlaces";
import FeaturedBoatTypes from "./FeatureBoatTypes/FeaturedBoatTypes";
import FeaturedShipowner from "./FeaturedShipowner/FeaturedShipowner";

const Main = () => {
    return (
        <>
            <div className={classes[`main-image`]}/>
            <FeaturedPlaces/>
            <FeaturedBoatTypes/>
            <FeaturedShipowner/>
        </>
    )
}

export default React.memo(Main);
