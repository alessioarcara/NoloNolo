import React from "react";
import MultiRangeSlider from "../../UI/RangeSlider/MultiRangeSlider";

const PriceFilter = () => {
    return (
        <div>
            <p className='filter-subtitle'>Scegli la fascia di prezzo giornaliera:</p>
            <MultiRangeSlider
                minValue={0}
                maxValue={10000}
                size={1000}
            />
        </div>
    );
}

export default PriceFilter;