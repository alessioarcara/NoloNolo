import classes from './InvoiceReport.module.css'
import {formatNumber, formatDayMonthYearDate, rangeDate} from "../../../../helpers/utils";
import {useMemo} from "react";
import Button from "../../../UI/Button/Button";

const InvoiceReport = ({dailyFee, fixedFee, start, end, statusRental, handleRentBoat}) => {
    const range = useMemo(() => rangeDate(start, end), [start, end])

    return (
        <div className={classes['report-container']}>
            <div className={classes['data-container']}>
                <label htmlFor='daily-fee'>Prezzo giornaliero</label>
                <div id='daily-fee' className={classes['daily-fee']}>
                    {formatNumber(dailyFee)}
                </div>
            </div>
            <div className={classes['data-container']}>
                <label htmlFor='fixed-fee'>Prezzo fisso</label>
                <div id='fixed-fee' className={classes['fixed-fee']}>
                    {formatNumber(fixedFee)}
                </div>
            </div>
            <div className={classes['data-container']}>
                <label htmlFor='dates'>Date</label>
                <div id='dates' className={classes.dates}>
                    {`${formatDayMonthYearDate(start, {day: 'numeric',month: 'short'})} - 
                    ${formatDayMonthYearDate(end, {day: 'numeric', month: 'short'})}`}
                </div>
            </div>
            <div className={classes['data-container']}>
                <label className={classes['total']} htmlFor='total'>Totale</label>
                <div id='total' className={classes['total']}>
                    {formatNumber((dailyFee * range) + fixedFee)}
                </div>
            </div>
            <Button
                className={`${classes['confirm-btn']} btn btn-primary`}
                isLoading={statusRental === "pending"}
                onClick={handleRentBoat}
            >
                Conferma
            </Button>
        </div>
    );
}

export default InvoiceReport