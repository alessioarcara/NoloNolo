import {useState} from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./SearchDatePicker.css"


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
            <ul className="days-text">
                <li>lu</li>
                <li>ma</li>
                <li>me</li>
                <li>gi</li>
                <li>ve</li>
                <li>sa</li>
                <li>do</li>
            </ul>
            <DatePicker
                wrapperClassName={"input-container"}
                selected={startDate}
                onChange={onChange}
                dateFormat="dd/MM/yyyy"
                startDate={startDate}
                endDate={endDate}
                monthsShown={3}
                selectsRange
                inline
            />
        </>
    );
};

export default SearchDatePicker;
