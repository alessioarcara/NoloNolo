import React from "react";
import classes from "./Main.module.css";
import ImageList from "./ImageList/ImageList";
import BoatType from "./BoatType";

const Main = () => {
    return (
        <>
            <div className={classes[`main-image`]}/>
            <ImageList/>
            <BoatType/>
        </>
    )
}

export default Main;