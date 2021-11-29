import React, {useCallback, useReducer} from "react";
import SelectPlaces from "./SelectPlaces/SelectPlaces";
import SelectDates from "./SelectDates/SelectDates";
import {formatDate} from "../../helpers/Utils/utils";
import {useNavigate} from "react-router-dom";
import searchReducer, {initialState} from "../../reducers/searchReducer";
import {CHANGE_END_DATE, CHANGE_START_DATE, CLEAR_DATES, SWITCH_SEARCH} from "../../helpers/Utils/constants";
import {addDays} from "date-fns";


const Search = ({closeModalHandler}) => {
    const navigate = useNavigate()
    const [state, dispatch] = useReducer(searchReducer, initialState);

    const searchClickHandler = useCallback(() => {
        navigate(`/boats?${state.region && `region=${state.region}`}${state.city ? `&city=${state.city}` : ``}${(state.startDate && state.endDate) ? `&from=${formatDate(state.startDate)}&to=${formatDate(state.endDate)}` : ``}`)
    }, [navigate, state])

    const moveClickHandler = useCallback((city, region) => {
        dispatch({ type: SWITCH_SEARCH, payload: {city, region}})
    }, []);

    const changeStartDateHandler = useCallback((start) => {
        dispatch({type: CHANGE_START_DATE, payload: start})
    }, [])

    const changeEndDateHandler = useCallback((end) => {
        dispatch({type: CHANGE_END_DATE, payload: end})
    }, [])

    const cancelSelectionHandler = useCallback(() => {
        dispatch({type: CLEAR_DATES})
    }, [])

    return (
        <>
            {!state.isNextPage && <SelectPlaces closeModalHandler={closeModalHandler} moveClickHandler={moveClickHandler}/>}
            {state.isNextPage && <SelectDates
                minDate={addDays(new Date(), 1)}
                startDate={state.startDate}
                endDate={state.endDate}
                changeStartDateHandler={changeStartDateHandler}
                changeEndDateHandler={changeEndDateHandler}
                cancelSelectionHandler={cancelSelectionHandler}
                searchClickHandler={searchClickHandler}
                moveClickHandler={moveClickHandler}
                skipTextButton="Salta"
                confirmTextButton="Avanti"
            />}
        </>
    );
};

export default Search;
