import classes from './BillBody.module.css';
import {formatDayMonthYearDate, formatNumber} from "../../../../helpers/Utils/utils";
import {rangeDate} from "../../../../helpers/Utils/utils";
import BillTable from "../Table/BillTable";

const BillBody = ({
                      number,
                      reservationDay,
                      customerEmail,
                      model,
                      yard,
                      startDate,
                      endDate,
                      dailyFee,
                      fixedFee,
                      totalAmount
                  }) => {
    return (
        <div className={classes['body-container']}>
            {/* Body Header */}
            <div className={classes['bill-data-container']}>
                <div className={classes['bill-data']}>
                    <span>
                        <span className={classes['object-title']}>Fattura n° </span>
                        {number}
                    </span>
                    <span>
                        <span className={classes['object-title']}>Data: </span>
                        {formatDayMonthYearDate(reservationDay, {day: 'numeric', month: 'short', year: 'numeric'})}</span>
                    <span>
                        <span className={classes['object-title']}>Valuta: </span>
                        <span>EUR</span>
                    </span>
                </div>
                <div className={classes['customer']}>
                    <label className={classes['object-title']} htmlFor='customer'>Destinatario</label>
                    <span id='customer'>{customerEmail}</span>
                </div>
            </div>
            {/* Body */}
            <BillTable
                className={classes['data']}
                thead={[<span>Descrizione</span>, <span>Costo</span>]}
                thbody={[
                    {
                        description: `${model}, ${yard}`,
                        cost: formatNumber(fixedFee)
                    },
                    {
                        description: `
                            ${formatDayMonthYearDate(startDate, {day: 'numeric', month: 'short'})} -
                            ${formatDayMonthYearDate(endDate, {day: 'numeric', month: 'short'})}
                        `,
                        cost: formatNumber(dailyFee * rangeDate(startDate, endDate))
                    }
                ]}
            />
            <section>
                <div className={classes['iva-container']}>
                    <label htmlFor='iva'>Imposte</label>
                    <span id='iva'>{formatNumber(0)}</span>
                </div>
                <div className={classes['total-amount-container']}>
                    <label className={classes['object-title']} htmlFor='total-amount'>Totale</label>
                    <span id='total-amount'>{formatNumber(totalAmount)}</span>
                </div>
            </section>
        </div>
    );
}

export default BillBody
