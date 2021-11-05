import React, {useCallback} from "react";
import DayPicker from "../../../UI/DatePicker/DayPicker";
import classes from "./BoatAvailability.module.css";

const BoatAvailability = ({startDate, endDate, changeStartDateHandler, changeEndDateHandler, place}) => {

    const cancelSelectionHandler = useCallback(() => {
        changeStartDateHandler(null)
        changeEndDateHandler(null)
    }, [changeStartDateHandler, changeEndDateHandler])

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
