import ContentSwitch from "./ContentSwitch";
import BoatInfo from "./BoatInfo";
import ShipownerInfo from "./ShipownerInfo";
import Header from "../Header";
import SlideShow from "../../UI/SlideShow/SlideShow";
import classes from "../ContentRight/ContentRight.module.css";

const ContentRight = ({
                          setVisibleContent,
                          boatModel,
                          boatReviews,
                          place,
                          images,
                          ownerEmail,
                          ownerAvatar,
                          boatDescription
                     }) => {
    return (
        <>
            <div className={classes['desktop-header']}><Header/></div>
            <ContentSwitch setVisibleContent={setVisibleContent}/>
            {/* if desktop then show SlideShow */}
            <div className={classes['images-container']}>
                <SlideShow classNameSlideShowSlider={classes['custom-images']} images={images}/>
            </div>

            {/* Container of elements */}
            <div className={classes.container}>
                <BoatInfo
                    model={boatModel}
                    reviews={boatReviews}
                    place={place}
                />
                <ShipownerInfo
                    shipownerEmail={ownerEmail}
                    shipownerAvatar={ownerAvatar}
                    shipownerPresentation={boatDescription}
                />
            </div>
        </>
    );
}

export default ContentRight;