import {useState} from "react";
import classes from './BoatReviews.module.css';
import StarIcon from "../../../UI/icons/StarIcon";
import {averageReviews} from "../../../../helpers/utils";
import ReviewsList from "./ReviewsList";
import LeftArrowIcon from "../../../UI/icons/LeftArrowIcon";
import RightArrowIcon from "../../../UI/icons/RightArrowIcon";

const BoatReviews = ({reviews}) => {
    const [firstIndex, setFirsIndex] = useState(0)
    const [lastIndex, setLastIndex] = useState(reviews.length - 1)

    const goNextReview = () => {
        setFirsIndex(prevState => prevState === reviews.length - 1 ? 0 : prevState + 1)
        setLastIndex(prevState => prevState === reviews.length - 1 ? 0 : prevState + 1)
    }

    const goPrevReview = () => {
        setFirsIndex(prevState => prevState === 0 ? reviews.length - 1 : prevState - 1)
        setLastIndex(prevState => prevState === 0 ? reviews.length - 1 : prevState - 1)
    }

    return (
        <>
            {/* Info reviews */}
            <div className={classes['reviews-title']}>Recensioni</div>
            <div className={classes['reviews-info']}>
                <StarIcon/>
                {reviews.length > 0 && averageReviews(reviews).toFixed(1)}
                <span>({reviews.length} recensioni)</span>
            </div>
            {/* Reviews container */}
            {reviews.length > 0 &&
                <div className={classes.container}>
                    <div className={classes['list-container']}>
                        <ReviewsList
                            reviews={reviews}
                            start={firstIndex}
                            end={lastIndex}
                        />
                    </div>
                    <div
                        className={classes['left-arrow']}
                        onClick={goPrevReview}
                    >
                        <LeftArrowIcon/>
                    </div>
                    <div
                        className={classes['right-arrow']}
                        onClick={goNextReview}
                    >
                        <RightArrowIcon/>
                    </div>
                </div>
            }
        </>
    );
}

export default BoatReviews