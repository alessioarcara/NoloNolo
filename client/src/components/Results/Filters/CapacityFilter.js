import React, {useCallback} from "react";
import './CapacityFilter.module.css';
import {ADD_GUEST, REMOVE_GUEST} from "../../../helpers/Utils/constants";

import classes from "./CapacityFilter.module.css"

const CapacityFilter = ({guests, dispatch}) => {
    const addPassenger = useCallback(() => {
        dispatch({type: ADD_GUEST})
    }, [dispatch])

    const rmvPassenger = useCallback(() => {
        dispatch({type: REMOVE_GUEST})
    }, [dispatch])

    return (
        <div className={'border-space'}>
            <p className='filter-subtitle'>Numero minimo di passeggeri:</p>
            <div className={classes["passengers-container"]}>
                <button className={classes["rmv-btn"]} type='button' onClick={rmvPassenger}>&#45;</button>
                <div className={classes['passengers-count']}>{guests}</div>
                <button className={classes["add-btn"]} type='button' onClick={addPassenger}>&#43;</button>
            </div>
        </div>
    );
}

export default CapacityFilter;
