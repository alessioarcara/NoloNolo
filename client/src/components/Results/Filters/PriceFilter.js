import React from "react";
import MultiRangeSlider from "../../UI/RangeSlider/MultiRangeSlider";

const PriceFilter = () => {
    return (
        <div>
            <p className='filter-subtitle'>Scegli la fascia di prezzo giornaliero:</p>
            <MultiRangeSlider
                min={0}
                max={10000}
            />
        </div>
    );
}

export default PriceFilter;