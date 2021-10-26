import React, {useCallback, useReducer} from "react";
import SelectPlaces from "./SelectPlaces/SelectPlaces";
import SelectDates from "./SelectDates/SelectDates";
import {formatDate} from "../../helpers/utils";
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import searchReducer, {initialState} from "../../reducers/searchReducer";
import {CHANGE_END_DATE, CHANGE_START_DATE, SWITCH_SEARCH} from "../../helpers/constants";


const Search = ({closeModalHandler}) => {
    const history = useHistory()
    const [state, dispatch] = useReducer(searchReducer, initialState);

    const searchClickHandler = useCallback(() => {
        history.push(`/search?${state.region && `region=${state.region}`}${state.city ? `&city=${state.city}` : ``}${(state.startDate && state.endDate) ? `&start=${formatDate(state.startDate)}&end=${formatDate(state.endDate)}` : ``}`)
    }, [history, state])
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
                startDate={state.startDate}
                endDate={state.endDate}
                changeStartDateHandler={changeStartDateHandler}
                changeEndDateHandler={changeEndDateHandler}
                cancelSelectionHandler={cancelSelectionHandler}
                searchClickHandler={searchClickHandler}
                moveClickHandler={moveClickHandler}
            />}
        </>
    );
};

export default Search;
