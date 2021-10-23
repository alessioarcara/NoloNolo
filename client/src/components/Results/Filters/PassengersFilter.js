import React from "react";
import './PassengersFilter.module.css';
import {ADD_GUEST, REMOVE_GUEST} from "../../../helpers/constants";

import classes from "./PassengersFilter.module.css"

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
            <div className={classes["passengers-container"]}>
                <button className={classes["rmv-btn"]} type='button' onClick={rmvPassenger}>&#45;</button>
                <input className={classes["passengers-count"]} type='text' value={guests} readOnly/>
                <button className={classes["add-btn"]} type='button' onClick={addPassenger}>&#43;</button>
            </div>
        </>
    );
}

export default PassengersFilter;
