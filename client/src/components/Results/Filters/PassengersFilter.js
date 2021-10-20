import React, {useState} from "react";
import './PassengersFilter.css';

const PassengersFilter = () => {
    const [passengers, setPassenger] = useState (0)

    const addPassenger = () => {
        setPassenger (oldValue => {
            if (oldValue + 1 > 5)
                return oldValue
            return oldValue + 1
        })
    }

    const rmvPassenger = () => {
        setPassenger (oldValue => {
            if (oldValue - 1 < 0)
                return 0
            return oldValue - 1
        })
    }

    return (
        <>
            <p className='filter-subtitle'>Numero massimo di passeggeri:</p>
            <div className='passengers-container'>
                <button className='btn rmv-btn' type='button' onClick={rmvPassenger}>&#45;</button>
                <div className='passengers-count'>{passengers}</div>
                <button className='btn add-btn' type='button' onClick={addPassenger}>&#43;</button>
            </div>
        </>
    );
}

export default PassengersFilter;