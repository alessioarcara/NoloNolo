import PropTypes from 'prop-types';
import { useState, useRef, useCallback, useEffect } from "react";
import './MultiRangeSlider.css';
import {formatNumber} from '../../../helpers/utils';

const MultiRangeSlider = ({min = 0, max = 50000, onChange}) => {
    const [minVal, setMinVal] = useState (min)
    const [maxVal, setMaxVal] = useState (max)

    const minValRef = useRef(min);
    const maxValRef = useRef(max);

    const range = useRef (null)

    // Convert to percentage
    const getPercent = useCallback((value) => {
        Math.round(((value - min) / (max - min)) * 100);
    }, [min, max]);

    // Set width of the range to change from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to change from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal, onChange]);


    return (
        <>
            {/*<input*/}
            {/*    type='range'*/}
            {/*    min={min}*/}
            {/*    max={max}*/}
            {/*    value={minVal}*/}
            {/*    onChange={event => {*/}
            {/*        const value = Math.min(Number(event.target.value), maxVal - 1000);*/}
            {/*        setMinVal(value);*/}
            {/*        minValRef.current = value;*/}
            {/*    }}*/}
            {/*    className='point point-left'*/}
            {/*    style={{ zIndex: minVal > max - 100 && "5" }}*/}
            {/*/>*/}
            {/*<input*/}
            {/*    type='range'*/}
            {/*    min={min}*/}
            {/*    max={max}*/}
            {/*    value={maxVal}*/}
            {/*    onChange={event => {*/}
            {/*        const value = Math.max(Number(event.target.value), minVal + 1000);*/}
            {/*        setMaxVal(value);*/}
            {/*        maxValRef.current = value;*/}
            {/*    }}*/}
            {/*    className='point point-right'*/}
            {/*/>*/}

            <div className="slider">
                <div className="slider__track" />
                <div ref={range} className="slider__range" />
                <div className="left-value">{formatNumber(minVal)}</div>
                <div className="right-value">{formatNumber(maxVal)}</div>
            </div>

        </>
    );
}

MultiRangeSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default MultiRangeSlider;