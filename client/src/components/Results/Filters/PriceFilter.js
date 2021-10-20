import React from "react";
import MultiRangeSlider from "./MultiRangeSlider";

const PriceFilter = () => {
    return (
        <div>
            <p className='filter-subtitle'>Scegli la fascia di prezzo:</p>
            <MultiRangeSlider
                min={0}
                max={50000}
                onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
            />
        </div>
    );
}

export default PriceFilter;