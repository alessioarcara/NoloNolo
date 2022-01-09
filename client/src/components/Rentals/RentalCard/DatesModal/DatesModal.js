import React, {useCallback, useContext, useEffect, useMemo, useReducer} from "react";
import SelectDates from "../../../Search/SelectDates/SelectDates";
import {CHANGE_END_DATE, CHANGE_START_DATE, CLEAR_DATES} from "../../../../helpers/Utils/constants";
import searchReducer, {initialState} from "../../../../reducers/searchReducer";
import useHttp from "../../../../hooks/use-http";
import {body_boatRentals, body_updateRental} from "../../../../helpers/httpConfig";
import AuthContext from "../../../../store/auth-context";
import classes from './DatesModal.module.css';
import {
    calculateTotal,
    formatDate,
    formatNumber,
    rangeDate,
    rentedDatesExceptUserDates
} from "../../../../helpers/Utils/utils";
import {addDays} from "date-fns";

const DatesModal = ({boatId, rentalId, start, end, dailyFee, fixedFee, onUpdateRentalDates, onGoRentalsPage}) => {
    const {token} = useContext(AuthContext)
    const [state, dispatch] = useReducer(searchReducer, {
        ...initialState, startDate: new Date(start), endDate: new Date(end)
    })

    const handleUpdateRentalDates = () => {
        onUpdateRentalDates(
            body_updateRental({
                rentalId,
                from: state.startDate,
                to: state.endDate
            }),
            (prevRentals, newRental) =>
                prevRentals.map(userRental => userRental._id === newRental._id ? newRental : userRental)
        )
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
    const filteredRentedDates = useMemo(() =>
            rentedDatesExceptUserDates(rentedDates, start, end),
    [rentedDates, start, end])

    useEffect(() => {
        fetchRentedDates({body: body_boatRentals({boatId}), token}, resData => resData.boatRentals)
    }, [fetchRentedDates, token, boatId])

    return (
        <>
            <SelectDates
                minDate={addDays(new Date(), 1)}
                startDate={state.startDate}
                endDate={state.endDate}
                moveClickHandler={onGoRentalsPage}
                changeStartDateHandler={changeStartDateHandler}
                changeEndDateHandler={changeEndDateHandler}
                cancelSelectionHandler={cancelSelectionHandler}
                alreadyRentedDates={filteredRentedDates}
            />
            <div className={classes['bottom-container']}>
                <span className={classes['total-amount']}>
                    {state.endDate && rangeDate(state.startDate, state.endDate) !== 0
                        ? `Totale ${formatNumber(calculateTotal(dailyFee, fixedFee, state.startDate, state.endDate))}`
                        : ""
                    }
                </span>
                <button
                    className={`${classes['btn-update']} btn btn-outline-primary`}
                    onClick={handleUpdateRentalDates}
                    disabled={!state.endDate || formatDate(state.startDate) === formatDate(state.endDate)}
                >
                    Aggiorna
                </button>
            </div>
        </>
    );
};

export default DatesModal;
