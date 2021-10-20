import React from "react";
import TypeFilter from "./TypeFilter";
import './Filter.css';
import PassengersFilter from "./PassengersFilter";
import PriceFilter from "./PriceFilter";

const Filter = () => {
    const submitHandler = (evt) => {
        evt.preventDefault()
        console.log(evt.target[0].checked)
    }

    return (
        <form className='container' onSubmit={submitHandler}>
            <TypeFilter/>
            <hr/>
            <PassengersFilter/>
            <hr/>
            <PriceFilter/>
            <button className='btn btn-filter' type='submit'>Cerca</button>
        </form>
    );
}

export default Filter;