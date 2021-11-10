import ContentSwitch from "./ContentSwitch";
import BoatInfo from "./BoatInfo/BoatInfo";
import ShipownerInfo from "./ShipownerInfo/ShipownerInfo";
import Header from "../Header";
import SlideShow from "../../UI/SlideShow/SlideShow";
import classes from "../ContentRight/ContentRight.module.css";
import BoatDetails from "./BoatDetails/BoatDetails";
import BoatAvailability from "./BoatAvailability/BoatAvailability";
import BoatReviews from "./BoatReviews/BoatReviews";

const ContentRight = ({
                          boatModel,
                          boatReviews,
                          place,
                          images,
                          ownerEmail,
                          ownerAvatar,
                          boatDescription,
                          boatYard,
                          boatLength,
                          boatMaxCapacity,
                          boatType,
                          startDate,
                          endDate,
                          alreadyRentedDates,
                          dispatch
                     }) => {
    return (
        <>
            <div className={classes['desktop-header']}><Header/></div>
            <ContentSwitch dispatch={dispatch}/>
            {/* if desktop then show SlideShow */}
            <div className={classes['images-container']}>
                <SlideShow classNameSlideShowSlider={classes['custom-images']} images={images}/>
            </div>

            {/* Container of elements */}
            <div className={classes.container}>
                <BoatInfo
                    model={boatModel}
                    place={place}
                />
                <ShipownerInfo
                    shipownerEmail={ownerEmail}
                    shipownerAvatar={ownerAvatar}
                    shipownerPresentation={boatDescription}
                />
                <BoatDetails
                    yard={boatYard}
                    length={boatLength}
                    maximumCapacity={boatMaxCapacity}
                    type={boatType}
                />
                <BoatAvailability
                    place={place}
                    startDate={startDate}
                    endDate={endDate}
                    dispatch={dispatch}
                    alreadyRentedDates={alreadyRentedDates}
                />
                <BoatReviews
                    reviews={boatReviews}
                />
            </div>
        </>
    );
}

export default ContentRight;
