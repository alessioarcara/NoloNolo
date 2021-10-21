import React from "react";
import MultiRangeSlider from "../../UI/RangeSlider/MultiRangeSlider";

const PriceFilter = ({minPrice, maxPrice, dispatch}) => {
    return (
        <div>
            <p className='filter-subtitle'>Scegli la fascia di prezzo giornaliera:</p>
            <MultiRangeSlider
                minPrice={minPrice}
                maxPrice={maxPrice}
                dispatch={dispatch}
                minValue={0}
                maxValue={10000}
                size={1000}
            />
        </div>
    );
}

export default PriceFilter;