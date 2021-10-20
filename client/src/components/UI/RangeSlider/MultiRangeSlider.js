import { useState, useRef, useCallback, useEffect } from "react";
import './MultiRangeSlider.css';
import {formatNumber} from '../../../helpers/utils';

const changeValue = (a, b) => {
    if (a > b) {
        let tmp = a
        a = b
        b = tmp
    }
    return {a, b}
}

const MultiRangeSlider = ({minValue = 0, maxValue = 10000, size = 1}) => {
    /* Settaggio valori min e max */
    const {a: min, b: max} = changeValue(minValue, maxValue)

    /* State per gestire il valore minimo e il valore massimo */
    const [minVal, setMinVal] = useState (min)
    const [maxVal, setMaxVal] = useState (max)

    /* useRef per */
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef (null)

    /* Ritorniamo il valore percentuale a seconda del valore passato */
    const getPercentage = useCallback((value) => {
        return Math.round(((value - min) / (max - min)) * 100);
    }, [min, max]);

    /*
    * Utilizzando useRef prendiamo il valore corrente di max e il valore corrente di min
    * e settiamo dinamicamente la lunghezza del range (compreso tra il minimo e il massimo)
    * e dei valori precedenti al minimo e antecedenti al massimo. Questa funzionalità
    * permette di fa emergere in right e left il nero e di permettere la visualizzazione
    * dello slider green grazie al valore di width
    */
    useEffect(() => {
        const minPercent = getPercentage(minVal);
        const maxPercent = getPercentage(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercentage]);

    useEffect(() => {
        const minPercent = getPercentage(minValRef.current);
        const maxPercent = getPercentage(maxVal);

        if (range.current) {
            range.current.style.right = `${maxPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercentage]);


    return (
        <>
            <input
                type='range'
                min={min}
                max={max}
                value={minVal}
                onChange={event => {
                    const value = Math.min(Number(event.target.value), maxVal - size);
                    setMinVal(value);
                    minValRef.current = value;
                }}
                className='point point-left'
            />
            <input
                type='range'
                min={min}
                max={max}
                value={maxVal}
                onChange={event => {
                    const value = Math.max(Number(event.target.value), minVal + size);
                    setMaxVal(value);
                    maxValRef.current = value;
                }}
                className='point point-right'
            />

            {/* Creazione barra per lo slider con doppi pollici e doppio slider */}
            <div className="slider">
                <div className="slider-track" />
                <div ref={range} className="slider-range" />
                <div className="left-value">{formatNumber(minVal)}</div>
                <div className="right-value">{formatNumber(maxVal)}</div>
            </div>

        </>
    );
}

export default MultiRangeSlider;