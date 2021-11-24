import classes from './RentalActive.module.css';
import ClockIcon from "../../../UI/icons/ClockIcon";
import {rangeDate, formatDayMonthYearDate} from "../../../../helpers/utils";
import CheckInIcon from "../../../UI/icons/CheckInIcon";

const activeRental = {
    customer: 'mario.rossi@test.it',
    start: new Date("2021-11-10"),
    end: new Date("2021-11-15"),
    totalAmount: 1300.95
}

const RentalActive = () => {

    return (

        <div className={classes['container']}>
            <div className={classes['active-container']}>
                <div className={classes['email']}>{activeRental.customer.split('@')[0]}</div>
                <div className={classes['range-container']}>
                    <ClockIcon/>
                    <div className={classes['text-style']}>
                        {`${rangeDate(activeRental.start, activeRental.end)} giorni`}
                    </div>
                </div>
                <div className={classes['dates']}>
                    <CheckInIcon/>
                    <div className={classes['text-style']}>
                        {`
                            ${formatDayMonthYearDate(activeRental.start, {day: 'numeric', month: 'short'})} - 
                            ${formatDayMonthYearDate(activeRental.end, {day: 'numeric', month: 'short'})}
                        `}
                    </div>
                </div>
                <button className={`${classes['close-btn']} btn btn-primary`}>Chiudi</button>
            </div>
        </div>
    );
}

export default RentalActive