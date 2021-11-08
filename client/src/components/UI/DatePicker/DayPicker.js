import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DayPicker.css'

// date-fns internalization imposta la localizzazione
import {registerLocale} from 'react-datepicker';
import it from 'date-fns/locale/it';
import React, {useMemo} from "react";
import {addDays} from "date-fns";

registerLocale('it', it);

const DayPicker = ({start, end, onChangeStartDate, onChangeEndDate, monthsShown, boatRentals}) => {
    const handleDateChange = (dates) => {
        const [start, end] = dates
        onChangeStartDate(start)
        onChangeEndDate(end)
    };

    const excludeDates = useMemo(() => {
        /* Array of dates */
        let dates = []

        /* for each object we add to the array data to deselect */
        boatRentals && boatRentals.forEach(rental => {
            const startDate = new Date(rental.from)
            const endDate = new Date(rental.to)

            for (let currentDate = startDate; currentDate <= endDate; currentDate = addDays(currentDate, 1)) {
                dates.push(currentDate)
            }
        })
        return dates
    }, [boatRentals])

    return (
        <DatePicker
            locale="it"
            wrapperClassName={"input-container"}
            minDate={new Date()}
            selected={start}
            startDate={start}
            endDate={end}
            onChange={handleDateChange}
            monthsShown={monthsShown}
            calendarStartDay={1}
            selectsRange
            inline
            // filterDate={isRented}
            excludeDates={excludeDates}
        />
    );
};

export default DayPicker;
