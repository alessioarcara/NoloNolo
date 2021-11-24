import classes from './RentalPreviousCard.module.css';
import StarIcon from "../../../../UI/icons/StarIcon";
import {formatDayMonthYearDate} from "../../../../../helpers/utils";

const stars = [0, 1, 2, 3, 4]

const RentalPreviousCard = ({start, end, customer}) => {
    return (
        <div className={classes['container']}>
            <div className={classes['customer-email']}>{customer.split('@')[0]}</div>
            <div className={classes['stars-container']}>
                {stars.map(index => {
                    return <StarIcon key={index}/>
                })}
            </div>
            <div className={classes.date}>
                {`
                    ${formatDayMonthYearDate(start, {day: 'numeric', month: 'short', year: 'numeric'})} - 
                    ${formatDayMonthYearDate(end, {day: 'numeric', month: 'short', year: 'numeric'})}
                `}
            </div>
            <button className={`${classes['bill-btn']} btn btn-primary`}>Fattura</button>
        </div>
    );
}

export default RentalPreviousCard