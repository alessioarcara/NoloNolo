import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SearchDatePicker.css';
// import it from "date-fns/local/it";


const SearchDatePicker = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <>
            <div>
                <ul className="days-text">
                    <li>Su</li>
                    <li>Mo</li>
                    <li>Tu</li>
                    <li>We</li>
                    <li>Th</li>
                    <li>Fr</li>
                    <li>Sa</li>
                </ul>
            </div>
            <DatePicker
                wrapperClassName={"input-container"}
                selected={startDate}
                onChange={onChange}
                dateFormat="dd/MM/yyyy"
                startDate={startDate}
                endDate={endDate}
                monthsShown={2}
                selectsRange
                inline
            />
        </>
    );
};

export default SearchDatePicker;
