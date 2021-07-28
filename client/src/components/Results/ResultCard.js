import classes from './ResultCard.module.css';
import StarIcon from "../UI/icons/StarIcon";
import SlideShow from "./SlideShow";

const ResultCard = (props) => {
    return (
        <>
            <div className={classes.card}>
                <SlideShow
                    key={props.id}
                    image={props.image}
                />

                <h3 className={classes['card-title']}>{props.name}</h3>
                <div className={classes['card-description']}>{props.description}</div>

                <div className={classes.info}>
                    <StarIcon/>
                    <span>4,6</span>
                    <span>(2 recensioni)</span>
                </div>

                <div className={classes.price}>{`€ ${props.price}/al giorno`}</div>
            </div>
        </>

    );
};

export default ResultCard;