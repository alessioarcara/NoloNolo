import React from "react";
import MultiRangeSlider from "../../UI/RangeSlider/MultiRangeSlider";
import classes from './PriceFilter.module.css';

const PriceFilter = ({minPrice, maxPrice, maxValue, dispatch}) => {
    return (
        <>
            <p className={`'filter-subtitle' ${classes.space}`}>Scegli la fascia di prezzo giornaliera:</p>
            <MultiRangeSlider
                minPrice={minPrice}
                maxPrice={maxPrice}
                dispatch={dispatch}
                maxValue={maxValue}
                size={50}
            />
        </>
    );
}

export default React.memo(PriceFilter);
