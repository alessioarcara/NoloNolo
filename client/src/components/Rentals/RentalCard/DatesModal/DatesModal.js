import React, {useCallback, useContext, useEffect, useReducer} from "react";
import SelectDates from "../../../Search/SelectDates/SelectDates";
import {CHANGE_END_DATE, CHANGE_START_DATE, CLEAR_DATES} from "../../../../helpers/constants";
import searchReducer, {initialState} from "../../../../reducers/searchReducer";
import useHttp from "../../../../hooks/use-http";
import {body_boatRentals} from "../../../../helpers/httpConfig";
import AuthContext from "../../../../store/auth-context";

const DatesModal = ({boatId, start, end, openModal}) => {
    const {token} = useContext(AuthContext)

    const [state, dispatch] = useReducer(searchReducer, {
        ...initialState, startDate: start, endDate: end
    })

    const backClickHandler = () => {
        openModal()
    }

    const cancelSelectionHandler = useCallback(() => {
        dispatch({type: CLEAR_DATES})
    }, [dispatch])

    const changeStartDateHandler = useCallback((start) => {
        dispatch({type: CHANGE_START_DATE, payload: start})
    }, [dispatch])

    const changeEndDateHandler = useCallback((end) => {
        dispatch({type: CHANGE_END_DATE, payload: end})
    }, [dispatch])

    const {data: rentedDates, sendRequest: fetchRentedDates} = useHttp(true)

    useEffect(() => {
        console.log(boatId)
        fetchRentedDates({body: body_boatRentals({boatId}), token}, resData => resData.boatRentals)
    }, [fetchRentedDates, token, boatId])

    return (
        <SelectDates
            startDate={state.startDate}
            endDate={state.endDate}
            changeStartDateHandler={changeStartDateHandler}
            changeEndDateHandler={changeEndDateHandler}
            moveClickHandler={backClickHandler}
            cancelSelectionHandler={cancelSelectionHandler}
            alreadyRentedDates={rentedDates}
            confirmTextButton="Aggiorna"
        />
    );
};

export default DatesModal;