import classes from './Actions.module.css';
import {formatNumber, formatDayShortMonthDate} from "../../../helpers/utils";
import Button from "../../UI/Button/Button";

// TODO: actions is really a good name for component?? =_=
const Actions = ({dailyFee, rentBoatHandler, statusRental}) => {

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
            {/* TODO: greys out this button if:
                - non authenticated
                - not selected dates
            */}
            <Button isLoading={statusRental === "pending"} onClick={rentBoatHandler} className='btn'>Prenota</Button>
        </div>
    );
}

export default Actions;
