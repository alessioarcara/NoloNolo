import classes from './Actions.module.css';
import {formatNumber, formatDayShortMonthDate} from "../../../helpers/utils";

const Actions = ({dailyFee}) => {

    console.log(dailyFee)
    return (
        <div className={classes['data-container']}>
            <div className={classes.report}>
                <span className={classes['total-price']}>{formatNumber(1700)}</span>
                <span className={classes['daily-fee']}>{`${formatNumber(dailyFee)} /al giorno`}</span>
                <span className={classes['date-range']}>
                    {`${formatDayShortMonthDate(new Date(1635698577168))} - ${formatDayShortMonthDate(new Date(1635698577168))}`}
                </span>
            </div>
            <button className='btn btn-primary'>Prenota</button>
        </div>
    );
}

export default Actions;