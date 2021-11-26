import classes from './RentalActive.module.css';
import ClockIcon from "../../../UI/icons/ClockIcon";
import {rangeDate, formatDayMonthYearDate} from "../../../../helpers/Utils/utils";
import CheckInIcon from "../../../UI/icons/CheckInIcon";

const RentalActive = ({activeRental}) => {
    return (
        <div className={classes['container']}>
            {activeRental &&
                <div className={classes['active-container']}>
                    <div className={classes['email']}>{activeRental.customer.email.split('@')[0]}</div>
                    <div className={classes['range-container']}>
                        <ClockIcon/>
                        <div className={classes['text-style']}>
                            {`${rangeDate(activeRental.from, activeRental.to)} giorni`}
                        </div>
                    </div>
                    <div className={classes['dates']}>
                        <CheckInIcon/>
                        <div className={classes['text-style']}>
                            {`
                                    ${formatDayMonthYearDate(activeRental.from, {day: 'numeric', month: 'short'})} - 
                                    ${formatDayMonthYearDate(activeRental.to, {day: 'numeric', month: 'short'})}
                                `}
                        </div>
                    </div>
                    <button className={`${classes['close-btn']} btn btn-primary`}>Chiudi</button>
                </div>
            }
        </div>
    );
}

export default RentalActive
