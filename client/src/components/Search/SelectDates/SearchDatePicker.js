import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SearchDatePicker.css';

// date-fns internalization imposta la localizzazione
import {registerLocale} from 'react-datepicker';
import it from 'date-fns/locale/it';
registerLocale('it', it);


const SearchDatePicker = ({start, end, onChangeStartDate, onChangeEndDate}) => {
    const handleDateChange = (dates) => {
        const [start, end] = dates
        onChangeStartDate(start)
        onChangeEndDate(end)
    };

    return (
        <>
            <DatePicker
                locale="it"
                wrapperClassName={"input-container"}
                minDate={new Date()}
                selected={start}
                startDate={start}
                endDate={end}
                onChange={handleDateChange}
                monthsShown={2}
                calendarStartDay={1}
                selectsRange
                inline
            />
        </>
    );
};

export default SearchDatePicker;
