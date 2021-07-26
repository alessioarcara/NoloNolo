import classes from './ResultCard.module.css';
import HeartIcon from "../UI/icons/MenuIcons/HeartIcon";
import StarIcon from "../UI/icons/StarIcon";
import {useState} from "react";

const ResultCard = (props) => {
    const [isClicked, setIsClicked] = useState(false);

    const changeClickHandler = () => {
        setIsClicked(state => !state);
    }

    return(
        <div className={classes.card}>
            <div className={classes.container}>
                <img src={props.image} class={classes['card-image']}/>
                <div onClick={changeClickHandler} className={isClicked ? `${classes.icon} ${classes.clicked}` : classes.icon}>
                    <HeartIcon className={classes.heart}/>
                </div>
            </div>

            <h3 className={classes['card-title']}>{props.name}</h3>
            <div className={classes.info}>
                <StarIcon/>
                <span>4,6</span>
                <span>(12)</span>
            </div>
            <div className={classes.price}>{`€ ${props.price}`}</div>

            {/*<p className={classes['card-description']}>{props.description}</p>*/}
        </div>
    );
};

export default ResultCard;