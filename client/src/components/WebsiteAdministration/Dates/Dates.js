import SelectDates from "../../Search/SelectDates/SelectDates";
import searchReducer, {initialState} from "../../../reducers/searchReducer";
import {useCallback, useContext, useEffect, useMemo, useReducer} from "react";
import {body_backdateRental, body_boatRentals} from "../../../helpers/httpConfig";
import {CHANGE_END_DATE, CHANGE_START_DATE, CLEAR_DATES} from "../../../helpers/Utils/constants";
import {formatDate, rentedDatesExceptUserDates} from "../../../helpers/Utils/utils";
import useHttp from "../../../hooks/use-http";
import AuthContext from "../../../store/auth-context";

const Dates = ({handleDatesModal, handleBackDateRentals, rentalId, boatId, from, to}) => {
    const {data: rentedDates, sendRequest: fetchDates} = useHttp(true)
    const filteredRentedDates = useMemo(() =>
            rentedDatesExceptUserDates(rentedDates, from, to),
    [rentedDates, from, to])
    const {token} = useContext(AuthContext)
    const [state, dispatch] = useReducer(searchReducer, {
        ...initialState, startDate: new Date(from), endDate: new Date(to)
    })

    const handleBackDate = () => {
        handleDatesModal()
        handleBackDateRentals(
            body_backdateRental({
                rentalId: rentalId,
                from: formatDate(state.startDate).toString(),
                to: formatDate(state.endDate).toString()}),
            (prevRentals, newRental) => prevRentals.map(rental => rental._id === rentalId ? newRental : rental)
        )
    }

    const cancelHandler = useCallback(() => {
        dispatch({type: CLEAR_DATES})
    }, [dispatch])

    const changeStartHandler = useCallback((start) => {
        dispatch({type: CHANGE_START_DATE, payload: start})
    }, [dispatch])

    const changeEndHandler = useCallback((end) => {
        dispatch({type: CHANGE_END_DATE, payload: end})
    }, [dispatch])

    useEffect(() => {
        fetchDates({body: body_boatRentals({boatId}), token}, resData => resData.boatRentals)
    }, [fetchDates, token, boatId])

    return (
            <SelectDates
                moveClickHandler={handleDatesModal}
                searchClickHandler={handleBackDate}
                confirmTextButton="Conferma"
                cancelSelectionHandler={cancelHandler}
                changeStartDateHandler={changeStartHandler}
                changeEndDateHandler={changeEndHandler}
                startDate={state.startDate}
                endDate={state.endDate}
                alreadyRentedDates={filteredRentedDates}
            />
    )
}

export default Dates
