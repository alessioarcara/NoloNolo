import React, {useReducer} from "react";
import TypeFilter from "./TypeFilter";
import './Filter.css';
import PassengersFilter from "./PassengersFilter";
import PriceFilter from "./PriceFilter";
import filterReducer from "./filterReducer";
import {CLEAR_FORM} from "../../../helpers/constants";

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
        <form className='container' onSubmit={submitHandler}>
            <TypeFilter dispatch={dispatch} types={state.boatsTypes}/>
            <hr/>
            <PassengersFilter dispatch={dispatch} guests={state.guests}/>
            <hr/>
            <PriceFilter minPrice={state.minPrice} maxPrice={state.maxPrice} dispatch={dispatch}/>

            <div className='modal-footer'>
                <button
                    disabled={isDisabled}
                    className='btn btn-clear'
                    onClick={clearHandler}
                >
                    Pulisci
                </button>
                <button
                    className='btn btn-filter'
                    type='submit'
                >
                    Cerca
                </button>
            </div>
        </form>
    );
}

export default Filter;