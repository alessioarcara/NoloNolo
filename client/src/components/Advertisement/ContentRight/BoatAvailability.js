import React, {useCallback} from "react";
import {useState} from "react";
import DayPicker from "../../UI/DatePicker/DayPicker";
import classes from "./BoatAbailability.module.css";

const BoatAvailability = ({place}) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const changeStartDateHandler = useCallback((start) => {
        setStartDate(start)
    }, [])

    const changeEndDateHandler = useCallback((end) => {
        setEndDate(end)
    }, [])

    const cancelSelectionHandler = useCallback(() => {
        setStartDate(null)
        setEndDate(null)
    }, [])

    return (
        <>
            <div className={classes[`title`]}>Disponibilità</div>
            <div className={classes[`row-space`]}>
                <div className={classes[`days-from`]}>[7] giorni da {place.city}</div>
                <DayPicker
                    start={startDate}
                    end={endDate}
                    onChangeStartDate={changeStartDateHandler}
                    onChangeEndDate={changeEndDateHandler}
                    monthsShown={1}
                />
            </div>
            <div
                className={classes[`delete-dates`]}
                onClick={cancelSelectionHandler}
            >
                Cancella date
            </div>
            <hr/>
        </>
    );
}

export default BoatAvailability;