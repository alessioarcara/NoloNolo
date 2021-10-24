import React, {useState} from "react";
import SelectPlaces from "./SelectPlaces/SelectPlaces";
import SelectDates from "./SelectDates/SelectDates";


const Search = ({closeModalHandler}) => {
    const [isNextPage, setNextPage] = useState(false)
    const [placeIsSent, setPlaceIsSent] = useState('')

    const moveClickHandler = event => {
        setPlaceIsSent(event.target.innerHTML)
        setNextPage(prevState => !prevState)
    }

    return (
        <>
            {!isNextPage && <SelectPlaces closeModalHandler={closeModalHandler} moveClickHandler={moveClickHandler}/>}
            {isNextPage && <SelectDates moveClickHandler={moveClickHandler} sendPlaceHandler={placeIsSent}/>}
        </>
    );
};

export default Search;
