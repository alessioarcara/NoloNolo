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
            <DatePicker
                selected={startDate}
                onChange={onChange}
                dateFormat="dd/MM/yyyy"
                startDate={startDate}
                endDate={endDate}
                monthsShown={3}
                selectsRange
                inline
            />
    );
};

export default SearchDatePicker;