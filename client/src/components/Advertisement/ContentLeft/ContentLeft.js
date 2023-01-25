import React, {useMemo} from "react";
import SlideShow from "../../UI/SlideShow/SlideShow";
import BoatMapPosition from "../../UI/Map/BoatMapPosition";
import classes from './ContentLeft.module.css';

const ContentLeft = ({isVisible, images, coordinates}) => {
    const boatPosition = useMemo(() =>  coordinates.slice().reverse(), [coordinates])

    return (
        <>
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
                <BoatMapPosition boatPosition={boatPosition}/>
            </div>
        </>
    );
}

export default React.memo(ContentLeft);

