import classes from './RentalPreviousCard.module.css';
import {formatDayMonthYearDate} from "../../../../../helpers/Utils/utils";
import Vote from "../../../../UI/Vote/Vote";
import {useContext, useState} from "react";
import BoatBill from "../../../../Advertisement/BoatBill/BoatBill";
import Modal from "../../../../UI/Modal/Modal";
import BreakpointContext from "../../../../../store/breakpoint-context";

const stars = [0, 1, 2, 3, 4]

const RentalPreviousCard = ({
                                billNumber,
                                start,
                                end,
                                boatData,
                                createdAt,
                                dailyFee,
                                fixedFee,
                                totalAmount,
                                customer,
                                review}) => {
    const [bill, setBill] = useState(false)
    const handleBillModal = () => setBill(prevState => !prevState)

    return (
        <>
            {bill &&
                <Modal closeModalHandler={handleBillModal}>
                    <BoatBill
                        billNumber={billNumber}
                        from={start}
                        to={end}
                        boatData={boatData}
                        createdAt={createdAt}
                        customer={customer.email}
                        dailyFee={dailyFee}
                        fixedFee={fixedFee}
                        totalAmount={totalAmount}
                    />
                </Modal>
            }
            <div className={classes['container']}>
                <div className={classes['customer-email']}>{customer.email.split('@')[0]}</div>
                <div className={classes['stars-container']}>
                    <Vote
                        votes={stars}
                        quoteIndex={review && review.rating - 1}
                        placeholder={true}
                    />
                </div>
                <div className={classes.date}>
                    {`
                        ${formatDayMonthYearDate(start, {day: 'numeric', month: 'short', year: 'numeric'})} -
                        ${formatDayMonthYearDate(end, {day: 'numeric', month: 'short', year: 'numeric'})}
                    `}
                </div>
                <button
                    className={`${classes['bill-btn']} btn btn-primary`}
                    onClick={handleBillModal}
                >
                    Fattura
                </button>
            </div>
        </>
    )
}

export default RentalPreviousCard
