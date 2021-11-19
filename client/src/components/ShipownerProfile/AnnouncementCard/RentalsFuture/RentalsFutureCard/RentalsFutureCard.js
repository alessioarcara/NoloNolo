import classes from './RentalsFutureCard.module.css';
import {formatDayMonthYearDate, formatNumber} from "../../../../../helpers/utils";

const RentalsFutureCard = ({customer, createdAt, start, end, totalAmount}) => {
    return (
        <div className={classes['future-container']}>
            <div>{formatDayMonthYearDate(createdAt, {day: "numeric", month: 'numeric', year: 'numeric'})}</div>
            <div>{customer.split('@')[0]}</div>
            <span className={classes['date']}>
                {`
                    ${formatDayMonthYearDate(start, {day: 'numeric', month: 'short', year: 'numeric'})} -
                    ${formatDayMonthYearDate(end, {day: 'numeric', month: 'short', year: 'numeric'})}
                `}
            </span>
            <div>{formatNumber(totalAmount)}</div>
        </div>
    );
}

export default RentalsFutureCard