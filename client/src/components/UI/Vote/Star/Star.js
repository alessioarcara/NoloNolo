import StarIcon from "../../icons/StarIcon";
import classes from './Star.module.css';

const Star = ({index, quoteIndex, changeQuote, isSelected, placeholderQuote = false}) => {
    /* Return index value */
    const changeStarHandler = (event) => {
        changeQuote(event.target.value)
    }

    return (
        <label className={placeholderQuote ? classes['star-container'] : classes['star-container-pointer']}>
            {/*If modifyQuote then change quote*/}
            {!placeholderQuote &&
            <input
                type='radio'
                name='radio-group'
                value={index}
                onClick={changeStarHandler}
            />
            }
            <div className={typeof quoteIndex === "undefined" ?
                classes['no-review']
                : isSelected ? classes['star-active-color'] : classes['star-color']}
            >
                <StarIcon/>
            </div>
        </label>
    );
};

export default Star;