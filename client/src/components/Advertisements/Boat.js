import React, {useCallback} from "react"
import classes from './Boat.module.css';
import StarIcon from "../UI/icons/StarIcon";
import SlideShow from "../UI/SlideShow/SlideShow";
import {useHistory} from "react-router-dom";
import Favorite from "../Favorite/Favorite";
import {formatNumber} from "../../helpers/utils";

const Boat = ({id, images, model, dailyFee, reviews, maxCapacity, advIsFavorite}) => {
    const history = useHistory()

    const averageReviews = useCallback(
        () => reviews.reduce((sum, {rating}) => sum + rating, 0) / reviews.length,
        [reviews]);


    const goAdvertisementPage = () => {
        history.push(`${history.location.pathname}/${id}`)
    }

    return (
        <div className={classes.card}>
            <SlideShow images={images}>
                <Favorite boatId={id} advIsFavorite={advIsFavorite}/>
                {/* price in mobile phone */}
                <div className={`${classes['price-mobile-phone']} ${classes['text-style']}`}>
                    Da {formatNumber(dailyFee)}
                </div>
            </SlideShow>
            {/* The second part with information */}
            <div className={classes.adapter} onClick={goAdvertisementPage}>
                <div className={classes.model}>{model}</div>
                <div className={`${classes.capacity} ${classes['text-style']}`}>Fino a {maxCapacity} passeggeri</div>
                <div
                    className={`${classes.price} ${classes['text-style']}`}>{`Da ${formatNumber(dailyFee)} /al giorno`}</div>
                <div className={classes.info}>
                    <StarIcon/>
                    <span>{reviews.length > 0 ? averageReviews().toFixed(1) : '0.0'}</span>
                    <span>({reviews.length})</span>
                </div>
                <button className={`btn btn-primary ${classes['btn-details']}`}>Dettagli</button>
            </div>
        </div>
    );
};

export default React.memo(Boat);
