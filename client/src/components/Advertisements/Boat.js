import React, {useState, useCallback} from "react"
import classes from './Boat.module.css';
import StarIcon from "../UI/icons/StarIcon";
import SlideShow from "../UI/SlideShow/SlideShow";
import HeartIcon from "../UI/icons/MenuIcons/HeartIcon";

const Boat = ({ id, images, model, description, dailyFee, reviews, totalFare }) => {
    const [isClicked, setIsClicked] = useState(false);

    const averageReviews = useCallback(
        () => reviews.reduce((sum, { rating }) => sum + rating, 0 ) / reviews.length,
        [reviews]);


    return (
        <>
            <div className={classes.card}>
                <SlideShow
                    key={id}
                    images={images}
                >
                    <div onClick={() => {setIsClicked(prevState => !prevState)}}
                         className={isClicked ? `${classes.icon} ${classes.clicked}` : classes.icon}>
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
