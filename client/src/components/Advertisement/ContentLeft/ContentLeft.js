import React from "react";
// import Header from "../Header";
import SlideShow from "../../UI/SlideShow/SlideShow";
import BoatMapPosition from "../../UI/Map/BoatMapPosition";
import classes from './ContentLeft.module.css';

const ContentLeft = ({isVisible, images, boatPosition}) => {
    console.log(boatPosition)
    return (
        <>
            {/* TO DO: margin-top in classes['container'] */}
            {/*<div className={classes['mobile-header']}><Header/></div>*/}
            <div className={classes['container']}>
                {!isVisible &&
                <div className={classes[`map-container`]}>
                    <BoatMapPosition boatPosition={boatPosition}/>
                </div>
                }
                {isVisible &&
                <div className={classes['images-container']}>
                    <SlideShow classNameSlideShowSlider={classes['custom-images']} images={images}/>
                </div>
                }
            </div>

            <div className={classes['container-desktop']}>
                <BoatMapPosition boatPosition={boatPosition.reverse()}/>
            </div>
        </>
    );
}

export default ContentLeft;
