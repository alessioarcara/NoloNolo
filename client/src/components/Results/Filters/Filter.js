import React, {useReducer} from "react";
import TypeFilter from "./TypeFilter";
import PassengersFilter from "./PassengersFilter";
import PriceFilter from "./PriceFilter";
import filterReducer from "./filterReducer";
import {CLEAR_FORM} from "../../../helpers/constants";
import ActionButtons from "../../UI/ActionButtons/ActionButtons";

import classes from "./Filter.module.css";

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
        console.log(state)
        onClose()
    }

    const clearHandler = () => {
        dispatch({type: CLEAR_FORM})
    }

    return (
        <form className={classes.container} onSubmit={submitHandler}>
            <TypeFilter dispatch={dispatch} types={state.boatsTypes}/>
            <PassengersFilter dispatch={dispatch} guests={state.guests}/>
            <PriceFilter minPrice={state.minPrice} maxPrice={state.maxPrice} dispatch={dispatch}/>
            <ActionButtons
                firstButtonClickHandler={clearHandler}
                firstButtonDisabled={isDisabled}
                firstButtonText='Pulisci'
                secondButtonClassName={`btn btn-primary`}
                secondButtonType='Submit'
                secondButtonDisabled={isDisabled}
                secondButtonText='Cerca'
            />
        </form>
    );
}

export default Filter;
