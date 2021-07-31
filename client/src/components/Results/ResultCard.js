import React, {useCallback} from "react"
import classes from './ResultCard.module.css';
import StarIcon from "../UI/icons/StarIcon";
import SlideShow from "./SlideShow";

const ResultCard = (props) => {
    const averageReviews = useCallback(
        () => props.reviews.reduce((acc, curr) => acc + curr ) / props.reviews.length,
        [props.reviews] );

    return (
        <>
            <div className={classes.card}>
                <SlideShow
                    key={props.id}
                    image={props.image}
                />

                <div className={classes.adapter}>
                    <h3 className={classes['card-title']}>{props.name}</h3>
                    <div className={classes['card-description']}>{props.description}</div>

                    <div className={classes.info}>
                        <StarIcon/>
                        <span>{props.reviews.length > 0 ? averageReviews : '0.0'}</span>
                        <span>({props.reviews.length})</span>
                    </div>

                    <div className={classes.price}>{`€ ${props.price}/al giorno`}</div>
                    <div className={classes['btn-ctn']}><button className={classes['btn-details']}>Dettagli</button></div>
                </div>
            </div>
        </>
    );
};

export default ResultCard;
