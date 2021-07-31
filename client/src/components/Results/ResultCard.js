import React, {useCallback} from "react"
import classes from './ResultCard.module.css';
import StarIcon from "../UI/icons/StarIcon";
import SlideShow from "./SlideShow";

const ResultCard = ({ id, image, name, description, price, reviews }) => {
    const averageReviews = useCallback(
        () => reviews.reduce((sum, { rating }) => sum + rating, 0 ) / reviews.length,
        [reviews]);


    return (
        <>
            <div className={classes.card}>
                <SlideShow
                    key={id}
                    image={image}
                />

                <div className={classes.adapter}>
                    <h3 className={classes['card-title']}>{name}</h3>
                    <div className={classes['card-description']}>{description}</div>

                    <div className={classes.info}>
                        <StarIcon/>
                        <span>{reviews.length > 0 ? averageReviews().toFixed(1) : '0.0'}</span>
                        <span>({reviews.length})</span>
                    </div>

                    <div className={classes.price}>{`€ ${price}/al giorno`}</div>
                    <div className={classes['btn-ctn']}><button className={classes['btn-details']}>Dettagli</button></div>
                </div>
            </div>
        </>
    );
};

export default ResultCard;
