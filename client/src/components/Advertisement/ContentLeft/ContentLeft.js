import React from "react";
import Header from "../Header";
import SlideShow from "../../UI/SlideShow/SlideShow";
import BoatMapPosition from "../../UI/Map/BoatMapPosition";
import classes from './ContentLeft.module.css';

const ContentLeft = ({isVisible, images, boatPosition}) => {
    return (
        <>
            {/* TO DO: marginTop in div style in SlideShow */}
            {/*<div className={classes['mobile-header']}><Header/></div>*/}
            <div className={classes['container-mobile']}>
                {!isVisible &&
                    <div className={classes[`map-container`]}>
                        <BoatMapPosition boatPosition={boatPosition}/>
                    </div>
                }
                {isVisible &&
                    <div style={{marginTop: '3.4rem'}}><SlideShow classNameSlideShowSlider={classes['custom-images']} images={images}/></div>
                }
            </div>

            <div className={classes['container-desktop']}>
                <BoatMapPosition boatPosition={boatPosition}/>
            </div>
        </>
    );
}

export default ContentLeft;