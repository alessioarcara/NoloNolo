import classes from './RentalPreviousCard.module.css';
import {formatDayMonthYearDate} from "../../../../../helpers/utils";
import Vote from "../../../../UI/Vote/Vote";

const stars = [0, 1, 2, 3, 4]

const RentalPreviousCard = ({start, end, customer, review}) => {

    return (
        <>
            {review &&
            <div className={classes['container']}>
                <div className={classes['customer-email']}>{customer.email.split('@')[0]}</div>
                <div className={classes['stars-container']}>
                    <Vote
                        votes={stars}
                        quoteIndex={review.rating - 1}
                        placeholder={true}
                    />
                </div>
                <div className={classes.date}>
                    {`
                        ${formatDayMonthYearDate(start, {day: 'numeric', month: 'short', year: 'numeric'})} -
                        ${formatDayMonthYearDate(end, {day: 'numeric', month: 'short', year: 'numeric'})}
                    `}
                </div>
                <button className={`${classes['bill-btn']} btn btn-primary`}>Fattura</button>
            </div>
            }
        </>
    )
}

export default RentalPreviousCard