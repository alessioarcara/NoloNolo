import React, {useRef} from "react";
import TypeFilter from "./TypeFilter";
import './Filter.css';
import PassengersFilter from "./PassengersFilter";
import PriceFilter from "./PriceFilter";

const Filter = ({onClose}) => {

    const submitHandler = (evt) => {
        evt.preventDefault()
        onClose()
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