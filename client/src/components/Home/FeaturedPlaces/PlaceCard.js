import {useNavigate} from 'react-router-dom';
import classes from './PlaceCard.module.css';

const PlaceCard = (props) => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(`/boats?region=${props.title}`);
    }

    return (
        <div className={classes[`place-card`]} onClick={clickHandler}>
            <img
                src={require(`../../../assets/${props.title}.jpg`).default}
                alt=""
            />
            <p>{props.title}</p>
        </div>
    );
};

export default PlaceCard;
