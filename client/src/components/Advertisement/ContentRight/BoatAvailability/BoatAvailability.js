import React, {useCallback} from "react";
import DayPicker from "../../../UI/DatePicker/DayPicker";
import classes from "./BoatAvailability.module.css";
import Button from "../../../UI/Button/Button";
import {rangeDate} from "../../../../helpers/Utils/utils";
import {CHANGE_END_DATE, CHANGE_START_DATE, CLEAR_DATES} from "../../../../helpers/Utils/constants";

const BoatAvailability = ({
                              startDate,
                              endDate,
                              dispatch,
                              place,
                              alreadyRentedDates
                          }) => {

    const cancelSelectionHandler = useCallback(() => {
        dispatch({type: CLEAR_DATES})
    }, [dispatch])
    const changeStartDateHandler = useCallback((start) => {
        dispatch({type: CHANGE_START_DATE, payload: start})
    }, [dispatch])
    const changeEndDateHandler = useCallback((end) => {
        dispatch({type: CHANGE_END_DATE, payload: end})
    }, [dispatch])

    return (
        <section className={classes[`boat-availability`]}>
            <div>
                <div className={classes[`title`]}>Disponibilità</div>
                <div className={classes[`date-range`]}>{rangeDate(startDate, endDate)} giorni da {place.city}</div>
            </div>
            <div className={classes.datepicker}>
                <DayPicker
                    start={startDate}
                    end={endDate}
                    onChangeStartDate={changeStartDateHandler}
                    onChangeEndDate={changeEndDateHandler}
                    monthsShown={1}
                    alreadyRentedDates={alreadyRentedDates}
                />
            </div>
            <Button
                className={`btn btn-secondary ${classes[`delete-dates`]}`}
                onClick={cancelSelectionHandler}
                disabled={!startDate || !endDate}
            >
                Cancella date
            </Button>
            <hr/>
        </section>
    );
}

export default BoatAvailability;
