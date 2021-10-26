import React, {useCallback, useReducer} from "react";
import TypeFilter from "./TypeFilter";
import CapacityFilter from "./CapacityFilter";
import PriceFilter from "./PriceFilter";
import {CLEAR_FORM, NUMBER_BOAT_TYPES} from "../../../helpers/constants";
import ActionButtons from "../../UI/ActionButtons/ActionButtons";

import classes from "./Filter.module.css";
import filterReducer, {initialState} from "./filterReducer";

const Filter = ({onSubmitFilters, onClose, boatsMaxPrice}) => {
    const [state, dispatch] = useReducer(filterReducer, initialState);
    const isDisabled =
        state.boatTypes.length === NUMBER_BOAT_TYPES && state.minCapacity === 0
        && state.maxPrice === boatsMaxPrice && state.minPrice === 0

    const submitHandler = evt => {
        evt.preventDefault()
        onSubmitFilters(state)
        onClose()
    };

    const clearHandler = useCallback(() => {
        dispatch({type: CLEAR_FORM, payload: boatsMaxPrice})
    }, [dispatch, boatsMaxPrice])

    return (
        <form className={classes.container} onSubmit={submitHandler}>
            <TypeFilter dispatch={dispatch} types={state.boatTypes}/>
            <CapacityFilter dispatch={dispatch} guests={state.minCapacity}/>
            <PriceFilter minPrice={state.minPrice} maxPrice={state.maxPrice} maxValue={boatsMaxPrice} dispatch={dispatch}/>
            <ActionButtons
                firstButtonClickHandler={clearHandler}
                firstButtonDisabled={isDisabled}
                firstButtonText='Pulisci'
                secondButtonClassName={`btn btn-primary`}
                secondButtonType='Submit'
                secondButtonText='Cerca'
            />
        </form>
    );
}

export default Filter;
