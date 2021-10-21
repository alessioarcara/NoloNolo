import React, {useReducer} from "react";
import TypeFilter from "./TypeFilter";
import './Filter.css';
import PassengersFilter from "./PassengersFilter";
import PriceFilter from "./PriceFilter";
import filterReducer from "./filterReducer";

// State iniziale per useReducer
const initialState = {
    boatsTypes: [],
    guests: 0,
    minPrice: 0,
    maxPrice: 0
}

const Filter = ({onClose}) => {
    console.log("Render Filter")
    const [state, dispatch] = useReducer(filterReducer, initialState);

    const submitHandler = (evt) => {
        evt.preventDefault()
        console.log(state)
        onClose()
    }

    return (
        <form className='container' onSubmit={submitHandler}>
            <TypeFilter dispatch={dispatch}/>
            <hr/>
            <PassengersFilter dispatch={dispatch} guests={state.guests}/>
            <hr/>
            <PriceFilter minPrice={state.minPrice} maxPrice={state.maxPrice} dispatch={dispatch}/>
            <button className='btn btn-filter' type='submit'>Cerca</button>
        </form>
    );
}

export default Filter;