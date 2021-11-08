import classes from './AdvertisementActions.module.css';
import {formatNumber, formatDayMonthYearDate, rangeDate} from "../../../helpers/utils";
import Button from "../../UI/Button/Button";
import {useContext, useMemo} from "react";
import AuthContext from "../../../store/auth-context";

const Actions = ({dailyFee, fixedFee, handleRentBoat, statusRental, startDate, endDate}) => {
    const { isLoggedIn: isLogged } = useContext(AuthContext)
    const rangeDates = useMemo(() => rangeDate(startDate, endDate), [startDate, endDate])

    /* Options for date */
    const options = {
        day: 'numeric',
        month: 'short'
    }

    return (
        <div className={classes['data-container']}>
            <div className={classes.report}>
                <span className={classes['total-price']}>{endDate && rangeDates !== 0 ? formatNumber((dailyFee * rangeDates) + fixedFee) : 'Seleziona date'}</span>
                <span className={classes['daily-fee']}>{`${formatNumber(dailyFee)} /al giorno`}</span>
                <span className={classes['fixed-fee']}>{`${formatNumber(fixedFee)} /fisso`}</span>
                <span className={classes['date-range']}>
                    {startDate && endDate && rangeDates !== 0 ? `${formatDayMonthYearDate(startDate, options)} - ${formatDayMonthYearDate(endDate, options)}` : 'Seleziona date'}
                </span>
            </div>
            <Button
                className={`btn btn-outline-primary ${classes['confirm-btn']}`}
                isLoading={statusRental === "pending"}
                onClick={handleRentBoat}
                disabled={!startDate || !endDate || !isLogged || rangeDates === 0}
            >
                Prenota
            </Button>
        </div>
    );
}

export default Actions;
