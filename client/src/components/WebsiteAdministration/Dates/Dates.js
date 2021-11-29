import SelectDates from "../../Search/SelectDates/SelectDates";
import searchReducer, {initialState} from "../../../reducers/searchReducer";
import {useCallback, useReducer} from "react";
import {body_backdateRental} from "../../../helpers/httpConfig";
import {CHANGE_END_DATE, CHANGE_START_DATE, CLEAR_DATES} from "../../../helpers/Utils/constants";

const Dates = ({handleDatesModal, handleBackDateRentals, rentalId, from, to}) => {
    const [state, dispatch] = useReducer(searchReducer, {
        ...initialState, startDate: new Date(from), endDate: new Date(to)
    })

    const handleBackDate = () => {
        handleDatesModal()
        handleBackDateRentals(
            body_backdateRental({
                rentalId: rentalId,
                from: state.startDate.toString(),
                to: state.endDate.toString()}),
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

    return (
        <>
            <SelectDates
                moveClickHandler={handleDatesModal}
                searchClickHandler={handleBackDate}
                confirmTextButton="Conferma"
                cancelSelectionHandler={cancelHandler}
                changeStartDateHandler={changeStartHandler}
                changeEndDateHandler={changeEndHandler}
                startDate={state.startDate}
                endDate={state.endDate}
            />
        </>
    )
}

export default Dates