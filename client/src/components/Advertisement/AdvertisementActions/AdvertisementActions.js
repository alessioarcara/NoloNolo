import classes from './AdvertisementActions.module.css';
import {formatNumber, formatDayMonthYearDate, rangeDate} from "../../../helpers/Utils/utils";
import Button from "../../UI/Button/Button";
import {useContext, useMemo} from "react";
import AuthContext from "../../../store/auth-context";
import Tooltip from "../../UI/Tooltip/Tooltip";

const AdvertisementActions = ({dailyFee, fixedFee, startDate, endDate, onShowConfirm}) => {
    const { isLoggedIn: isLogged } = useContext(AuthContext)
    const rangeDates = useMemo(() => rangeDate(startDate, endDate), [startDate, endDate])

    return (
        <div className={classes['data-container']}>
            <div className={classes.report}>
                <span className={classes['total-price']}>{endDate && rangeDates !== 0 ? formatNumber((dailyFee * rangeDates) + fixedFee) : 'Seleziona date'}</span>
                <span className={classes['daily-fee']}>{`${formatNumber(dailyFee)} /al giorno`}</span>
                <span className={classes['fixed-fee']}>{`${formatNumber(fixedFee)} /fisso`}</span>
                <span className={classes['date-range']}>
                    {startDate && endDate && rangeDates !== 0 ? `${formatDayMonthYearDate(startDate, {day: 'numeric',
                        month: 'short'})} - ${formatDayMonthYearDate(endDate, {day: 'numeric',
                        month: 'short'})}` : 'Seleziona date'}
                </span>
            </div>
            <Tooltip text="Prima di effettuare una prenotazione devi accedere" isShownTooltip={!isLogged} positionTop={false}>
                <Button
                    className={`btn btn-outline-primary ${classes['confirm-btn']}`}
                    onClick={onShowConfirm}
                    disabled={!startDate || !endDate || !isLogged || rangeDates === 0}
                >
                    Prenota
                </Button>
            </Tooltip>
        </div>
    );
}

export default AdvertisementActions;
