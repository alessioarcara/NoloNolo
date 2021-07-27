import classes from './ResultCard.module.css';
import HeartIcon from "../UI/icons/MenuIcons/HeartIcon";
import StarIcon from "../UI/icons/StarIcon";
import {useState} from "react";

const ResultCard = (props) => {
    const [isClicked, setIsClicked] = useState(false);

    const changeClickHandler = () => {
        setIsClicked(state => !state);
    }

    return (
        <div className={classes.card}>
            <div className={classes.container}>
                <div className={`${classes['scroll-container']} ${classes['x-scroll']} ${classes['x-mandatory']}`}>
                    <div className={classes.wrapper}>
                        <div className={classes.element}><img src={props.image} className={classes['card-image']}/></div>
                        <div className={classes.element}><img src={props.image} className={classes['card-image']}/></div>
                    </div>
                </div>

                <div onClick={changeClickHandler}
                     className={isClicked ? `${classes.icon} ${classes.clicked}` : classes.icon}>
                    <HeartIcon className={classes.heart}/>
                </div>
            </div>

            <h3 className={classes['card-title']}>{props.name}</h3>
            <div className={classes['card-description']}>{props.description}</div>

            <div className={classes.info}>
                <StarIcon/>
                <span>4,6</span>
                <span>(2 recensioni)</span>
            </div>

            <div className={classes.price}>{`€ ${props.price}/al giorno`}</div>

        </div>
    );
};

export default ResultCard;