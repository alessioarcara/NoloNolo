import classes from './RentalActive.module.css';
import {rangeDate, formatDayMonthYearDate} from "../../../../helpers/Utils/utils";
import CheckInIcon from "../../../UI/icons/CheckInIcon";
import HourglassIcon from "../../../UI/icons/HourglassIcon";

const RentalActive = ({activeRental}) => {
    return (
        <div className={classes['container']}>
            {activeRental &&
            <div className={classes['active-container']}>
                <div className={classes['email']}>{activeRental.customer.email.split('@')[0]}</div>
                <div className={classes['days-left']}>
                    <HourglassIcon/>
                    <div className={classes['text-style']}>
                        {`
                            ${rangeDate(new Date(), activeRental.to) !== 0
                                ? Math.abs(rangeDate(new Date(), activeRental.to))
                                : ''
                            }
                            ${rangeDate(new Date(), activeRental.to) === -1
                                ? "giorno in ritardo"
                                : rangeDate(new Date(), activeRental.to) < 0
                                    ? "giorni in ritardo"
                                    : rangeDate(new Date(), activeRental.to) === 1
                                        ? "giorno al termine"
                                        : rangeDate(new Date(), activeRental.to) === 0
                                            ? "terminato oggi"
                                            : "giorni al termine"
                            }
                        `}
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
                <button
                    className={`${classes['close-btn']} btn btn-primary`}
                    disabled={rangeDate(new Date(), activeRental.to) > 0}
                    title="Chiudi noleggio al termine"
                >
                    Chiudi
                </button>
            </div>
            }
        </div>
    );
}

export default RentalActive
