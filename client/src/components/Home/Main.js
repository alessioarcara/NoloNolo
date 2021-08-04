import React from "react";
import classes from "./Main.module.css";
import RecommendedPlaces from "./RecommendedPlaces/RecommendedPlaces";
import BoatType from "./BoatType";

const Main = () => {
    return (
        <>
            <div className={classes[`main-image`]}/>
            <RecommendedPlaces/>
            <BoatType/>
        </>
    )
}

export default Main;
