import React from "react";
import MultiRangeSlider from "../../UI/RangeSlider/MultiRangeSlider";
import classes from './PriceFilter.module.css';

const PriceFilter = ({minPrice, maxPrice, dispatch}) => {
    return (
        <>
            <p className={`'filter-subtitle' ${classes.space}`}>Scegli la fascia di prezzo giornaliera:</p>
            <MultiRangeSlider
                minPrice={minPrice}
                maxPrice={maxPrice}
                dispatch={dispatch}
                minValue={0}
                maxValue={10000}
                size={1000}
            />
        </>
    );
}

export default PriceFilter;