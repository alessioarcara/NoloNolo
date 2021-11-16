import StarIcon from "../../../../UI/icons/StarIcon";
import classes from './Star.module.css';

const Star = ({index, changeQuote, isSelected}) => {
    /* Return index value */
    const changeStarHandler = (event) => {
        changeQuote(event.target.value)
    }

    return (
        <label className={classes['star-container']}>
            <input
                type='radio'
                name='radio-group'
                value={index}
                onClick={changeStarHandler}
            />
            <div className={isSelected ? classes['star-icon-color'] : ''}>
                <StarIcon/>
            </div>
        </label>
    );
};

export default Star;