import {useCallback} from "react";
import classes from "./BoatInfo.module.css";
import StarIcon from "../../UI/icons/StarIcon";
import RegionIcon from "../../UI/icons/RegionIcon";

const BoatInfo = ({model, reviews, place}) => {
    const averageReviews = useCallback(() =>
            reviews.reduce((sum, { rating }) => sum + rating, 0 ) / reviews.length,
        [reviews]);

    return (
        <>
            {/* Content boat model */}
            <div className={classes['boat-title']}>{model}</div>
            {/* Content reviews */}
            <div className={classes['content-reviews']}>
                <StarIcon/>
                {reviews.length > 0 ? averageReviews().toFixed(1) : '0.0'}
                <span>{`(${reviews.length} recensioni)`}</span>
            </div>
            {/* Content place */}
            <div className={classes['content-place']}>
                <RegionIcon/>
                <span className={classes['place-text']}>{place.city ? `${place.city} - ${place.region}` : `${place.region}`}</span>
            </div>
            <hr/>
        </>
    );
}

export default BoatInfo;