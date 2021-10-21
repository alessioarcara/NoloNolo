import React from "react";
import './PassengersFilter.css';
import {ADD_GUEST, REMOVE_GUEST} from "../../../helpers/constants";

const PassengersFilter = ({guests, dispatch}) => {
    const addPassenger = () => {
        dispatch({type: ADD_GUEST})
    }

    const rmvPassenger = () => {
        dispatch({type: REMOVE_GUEST})
    }

    return (
        <>
            <p className='filter-subtitle'>Numero massimo di passeggeri:</p>
            <div className='passengers-container'>
                <button className='btn rmv-btn' type='button' onClick={rmvPassenger}>&#45;</button>
                <input className='passengers-count' type='text' value={guests} readOnly/>
                <button className='btn add-btn' type='button' onClick={addPassenger}>&#43;</button>
            </div>
        </>
    );
}

export default PassengersFilter;