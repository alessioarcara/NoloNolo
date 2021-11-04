import StarIcon from "../../UI/icons/StarIcon";
import RegionIcon from "../../UI/icons/RegionIcon";
import classes from "./BoatInfo.module.css";
import {averageReviews} from "../../../helpers/utils";

const BoatInfo = ({model, reviews, place}) => {
    return (
        <>
            {/* Content boat model */}
            <div className={classes['boat-title']}>{model}</div>
            {/* Content reviews */}
            <div className={classes['content-reviews']}>
                <StarIcon/>
                {reviews.length > 0 ? averageReviews(reviews).toFixed(1) : '0.0'}
                <span>{`(${reviews.length} recensioni)`}</span>
            </div>
            {/* Content place */}
            <div className={classes['content-place']}>
                <RegionIcon/>
                <span className={classes['place-text']}>{`${place.harbour}, ${place.city}, ${place.region}`}</span>
            </div>
            <hr/>
        </>
    );
}

export default BoatInfo;