import classes from './BoatReviews.module.css';
import StarIcon from "../../../UI/icons/StarIcon";
import {averageReviews} from "../../../../helpers/utils";
import ReviewsList from "./ReviewsList";

const BoatReviews = ({reviews}) => {
    return (
        <>
            {/* Info reviews */}
            <div className={classes['reviews-title']}>Recensioni</div>
            <div className={classes['reviews-info']}>
                <StarIcon/>
                {reviews.length > 0 ? averageReviews(reviews).toFixed(1) : '0.0'}
                <span>· {reviews.length} recensioni</span>
            </div>
            {/* Reviews container */}
            <div className={classes.container}>
                <ReviewsList
                    reviews={reviews}
                />
            </div>
        </>
    );
}

export default BoatReviews