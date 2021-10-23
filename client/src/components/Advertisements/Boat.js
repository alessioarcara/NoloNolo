import React, {useState, useCallback} from "react"
import classes from './Boat.module.css';
import StarIcon from "../UI/icons/StarIcon";
import SlideShow from "../UI/SlideShow/SlideShow";
import HeartIcon from "../UI/icons/MenuIcons/HeartIcon";
import {useStore} from "../../hooks-store/store";

const Boat = ({ id, images, model, description, dailyFee, reviews, totalFare, advIsFavorite }) => {
    const [isFavorite, setIsFavorite] = useState(advIsFavorite);

    const averageReviews = useCallback(
        () => reviews.reduce((sum, { rating }) => sum + rating, 0 ) / reviews.length,
        [reviews]);

    const dispatch = useStore()[1]

    const toggleFavoritesStatusHandler = () => {
        dispatch(
            'TOGGLE_FAV',
            { _id: id, hasAdvertisement: { images, description, dailyFee, reviews}, model, totalFare, advIsFavorite: true }
        )
        setIsFavorite(prevState => !prevState)
    }

    return (
        <>
            <div className={classes.card}>
                <SlideShow
                    images={images}
                >
                    <div onClick={toggleFavoritesStatusHandler}
                         className={isFavorite ? `${classes.icon} ${classes.clicked}` : classes.icon}>
                        <HeartIcon className={classes.heart}/>
                    </div>
                </SlideShow>
                <div className={classes.adapter}>
                    <h3 className={classes['card-title']}>{model}</h3>
                    <div className={classes['card-description']}>{description}</div>
                    <div className={classes.info}>
                        <StarIcon/>
                        <span>{reviews.length > 0 ? averageReviews().toFixed(1) : '0.0'}</span>
                        <span>({reviews.length})</span>
                    </div>
                    <div className={classes.price}>{`€ ${dailyFee}/al giorno`}</div>
                    {/*{totalFare !== 0 && <div className={classes.total}>{`€ ${totalFare}/totale`}</div>}*/}
                    <div className={classes['btn-ctn']}><button className={classes['btn-details']}>Dettagli</button></div>
                </div>
            </div>
        </>
    );
};

export default Boat;
