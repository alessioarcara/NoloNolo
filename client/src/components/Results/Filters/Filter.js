import React, {useReducer} from "react";
import TypeFilter from "./TypeFilter";
import PassengersFilter from "./PassengersFilter";
import PriceFilter from "./PriceFilter";
import filterReducer from "./filterReducer";
import {CLEAR_FORM} from "../../../helpers/constants";
import ActionButtons from "../../UI/ActionButtons/ActionButtons";

import classes from "./Filter.module.css"

export const initialState = {
    boatsTypes: [],
    guests: 0,
    minPrice: 0,
    maxPrice: 10000
}

const Filter = ({onClose}) => {
    const [state, dispatch] = useReducer(filterReducer, initialState);
    const isDisabled = state.boatsTypes.length === 0 || state.guests === 0

    const submitHandler = (evt) => {
        evt.preventDefault()
        onClose()
    }

    const clearHandler = () => {
        dispatch({type: CLEAR_FORM})
    }

    return (
        <form className={classes.container} onSubmit={submitHandler}>
            <TypeFilter dispatch={dispatch} types={state.boatsTypes}/>
            <hr/>
            <PassengersFilter dispatch={dispatch} guests={state.guests}/>
            <hr/>
            <PriceFilter minPrice={state.minPrice} maxPrice={state.maxPrice} dispatch={dispatch}/>
            <ActionButtons
                // actionClassName={classes["modal-footer"]}
                // firstButtonClassName={`btn ${classes["btn-clear"]}`}
                firstButtonClickHandler={clearHandler}
                firstButtonDisabled={isDisabled}
                firstButtonText='Pulisci'
                secondButtonClassName={`btn btn-primary`}
                // secondButtonClickHandler={goForwardClickHandler}
                secondButtonType='Submit'
                secondButtonText='Cerca'
            />
        </form>
    );
}

export default Filter;
