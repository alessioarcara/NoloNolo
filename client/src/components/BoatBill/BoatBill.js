import classes from './BoatBill.module.css';
import BillHeader from "./BillHeader/BillHeader";
import BillBody from "./BillBody/BillBody";
import Note from "./Note/Note";

const BoatBill = ({billNumber, from, to, boatData, customer, createdAt, dailyFee, fixedFee, redeliveryDate, totalAmount}) => {
    return (
        <div className={classes['bill-container']}>
            <BillHeader
                shipowner={boatData.owner.email}
                city={boatData.isDocked.city}
                region={boatData.isDocked.region}
                harbour={boatData.isDocked.harbour}
            />
            <hr/>
            <BillBody
                number={billNumber}
                reservationDay={createdAt}
                customerEmail={customer}
                model={boatData.model}
                yard={boatData.yard}
                startDate={from}
                endDate={to}
                dailyFee={dailyFee}
                fixedFee={fixedFee}
                redeliveryDate={redeliveryDate}
                totalAmount={totalAmount}
            />
            <hr/>
            <Note/>
        </div>
    );
}

export default BoatBill
