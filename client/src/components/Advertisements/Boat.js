import React, {useCallback} from "react"
import classes from './Boat.module.css';
import StarIcon from "../UI/icons/StarIcon";
import SlideShow from "../UI/SlideShow/SlideShow";
import {Link} from "react-router-dom";
import Favorite from "../Favorite/Favorite";
import {formatNumber} from "../../helpers/utils";

const Boat = ({id, images, model, description, dailyFee, reviews, totalFare, advIsFavorite}) => {

    const averageReviews = useCallback(
        () => reviews.reduce((sum, {rating}) => sum + rating, 0) / reviews.length,
        [reviews]);

    return (
        <div className={classes.card}>
            <SlideShow images={images}>
                <Favorite boatId={id} advIsFavorite={advIsFavorite}/>
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
                <div className={classes['btn-ctn']}>
                    <Link to={location => `${location.pathname}/${id}`}>
                        <button className={classes['btn-details']}>Dettagli</button>
                    </Link>
                </div>
            </div>
        </div>
        <>
            <div className={classes.card}>
                {/* The first part with images */}
                <SlideShow images={images}>
                    <>
                        {isLoggedIn &&
                        <div onClick={toggleFavoritesStatusHandler}
                             className={isFavorite ? `${classes.icon} ${classes.clicked}` : classes.icon}>
                            <HeartIcon className={classes.heart}/>
                        </div>
                        }
                        {/* price in mobile phone */}
                        <div className={`${classes['price-mobile-phone']} ${classes['text-style']}`}>
                            Da {formatNumber(dailyFee)}
                        </div>
                    </>
                </SlideShow>
                {/* The second part with information */}
                <div className={classes.adapter} onClick={() => alert('Premuto!')}>
                    <div className={classes.model}>{model}</div>
                    <div className={`${classes.capacity} ${classes['text-style']}`}>Fino a {maxCapacity} passeggeri</div>
                    <div className={`${classes.price} ${classes['text-style']}`}>{`Da ${formatNumber(dailyFee)} /al giorno`}</div>
                    <div className={classes.info}>
                        <StarIcon/>
                        <span>{reviews.length > 0 ? averageReviews().toFixed(1) : '0.0'}</span>
                        <span>({reviews.length})</span>
                    </div>
                    {/*<div className={classes['btn-details']}>*/}
                        <Link to={location => `${location.pathname}/${id}`}>
                            <button className={`btn btn-primary ${classes['btn-details']}`}>Dettagli</button>
                        </Link>
                    {/*</div>*/}
                </div>
            </div>
        </>
    );
};

export default React.memo(Boat);
