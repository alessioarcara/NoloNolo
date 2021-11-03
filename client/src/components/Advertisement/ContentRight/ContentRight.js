import ContentSwitch from "./ContentSwitch";
import classes from "../ContentRight/ContentRight.module.css";
import BoatInfo from "./BoatInfo";
import ShipownerInfo from "./ShipownerInfo";
import Header from "../Header";
import SlideShow from "../../UI/SlideShow/SlideShow";

const ContentRight = ({
                          setVisibleContent,
                          boatModel,
                          boatReviews,
                          place,
                          images
}) => {
    return (
        <>
            <div className={classes['desktop-header']}><Header/></div>
            <ContentSwitch setVisibleContent={setVisibleContent}/>
            {/* if desktop then show SlideShow */}
            <div className={classes['images-container']}>
                <SlideShow classNameSlideShowSlider={classes['custom']} images={images}/>
            </div>

            {/* Container of elements */}
            <div className={classes.container}>
                <BoatInfo
                    model={boatModel}
                    reviews={boatReviews}
                    place={place}
                />
                <ShipownerInfo

                />
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
                <p>C</p>
            </div>
        </>
    );
}

export default ContentRight;