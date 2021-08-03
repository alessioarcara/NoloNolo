import {useHistory} from 'react-router-dom';
import classes from './PlaceCard.module.css';

const PlaceCard = (props) => {
    const history = useHistory();

    const clickHandler = () => {
        history.push(`/${props.text}`);
    }

    return (
        <div className={classes[`image-card`]}>
            <img
                src={require(`../../../assets/${props.text}.jpg`).default}
                onClick={clickHandler}
                alt=""
            />
            <p>{props.text}</p>
        </div>
    );
};

export default PlaceCard;
