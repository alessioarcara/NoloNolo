import React, {useCallback} from "react";
import DayPicker from "../../../UI/DatePicker/DayPicker";
import classes from "./BoatAvailability.module.css";
import Button from "../../../UI/Button/Button";
import {rangeDate} from "../../../../helpers/utils";

const BoatAvailability = ({
                              startDate,
                              endDate,
                              changeStartDateHandler,
                              changeEndDateHandler,
                              place,
                              alreadyRentedDates
}) => {

    const cancelSelectionHandler = useCallback(() => {
        changeStartDateHandler(null)
        changeEndDateHandler(null)
    }, [changeStartDateHandler, changeEndDateHandler])

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
