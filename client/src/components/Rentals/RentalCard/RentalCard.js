import SlideShow from "../../UI/SlideShow/SlideShow";
import {formatDayMonthYearDate, formatNumber} from "../../../helpers/utils";
import {useCallback, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import Modal from "../../UI/Modal/Modal";
import BreakpointContext from "../../../store/breakpoint-context";
import DatesModal from "./DatesModal/DatesModal";
import BoatBill from "../../Advertisement/BoatBill/BoatBill";
import ReviewModal from "../RentalCard/ReviewModal/ReviewModal";
import classes from './RentalCard.module.css';
import {body_deleteRental} from "../../../helpers/httpConfig";

const RentalCard = ({
                        onUpdateOrDeleteRentals,
                        rentalId,
                        boatId,
                        previous,
                        active,
                        future,
                        images,
                        from,
                        to,
                        city,
                        billNumber,
                        boatData,
                        customer,
                        createdAt,
                        rentalDailyFee,
                        rentalFixedFee,
                        advertisementDailyFee,
                        advertisementFixedFee,
                        totalAmount,
                        review,
                        isReviewed
                    }) => {

    const breakpointCtx = useContext(BreakpointContext)
    const navigate = useNavigate()

    const [modal, setModal] = useState("")
    const handleSelectModal = useCallback(
        e => e.target.dataset.modal ? setModal(e.target.dataset.modal) : setModal(""),
        [])

    const handleUpdateRental = useCallback((body, applyData) => {
        onUpdateOrDeleteRentals(body, applyData)
        setModal("")
    }, [onUpdateOrDeleteRentals])

    const handleDeleteRental = useCallback(() => {
        onUpdateOrDeleteRentals(
            body_deleteRental({rentalId}),
            (prevRentals, newRentalId) => prevRentals.filter(userRental => userRental._id !== newRentalId)
        )
    }, [onUpdateOrDeleteRentals, rentalId])

    const goAdvertisementPage = useCallback(() => {
        navigate(`/boats/${boatId}`, {state: {startUrlDate: from, endUrlDate: to}})
    }, [navigate, boatId, from, to])

    return (
        <>
            {modal !== "" &&
            <Modal
                closeModalHandler={handleSelectModal}
                adapterSize={modal === "dates" && breakpointCtx.breakpoint}
            >
                {modal === "review" &&
                <ReviewModal
                    rentalId={rentalId}
                    customerId={customer._id}
                    review={review}
                    onPublishReview={handleUpdateRental}
                    isReviewed={isReviewed}
                />
                }
                {modal === "delete" &&
                <div className={classes['delete-section']}>
                    <p>Eliminare questo noleggio?</p>
                    <button
                        className={`btn btn-outline-primary ${classes['btn-confirm']}`}
                        onClick={handleDeleteRental}
                    >
                        Conferma
                    </button>
                </div>
                }
                {modal === "dates" &&
                <DatesModal
                    onUpdateRentalDates={handleUpdateRental}
                    boatId={boatId}
                    rentalId={rentalId}
                    start={from}
                    end={to}
                    dailyFee={advertisementDailyFee}
                    fixedFee={advertisementFixedFee}
                    onGoRentalsPage={handleSelectModal}
                />
                }
                {modal === "bill" &&
                <BoatBill
                    billNumber={billNumber}
                    from={from}
                    to={to}
                    boatData={boatData}
                    customer={customer.email}
                    createdAt={createdAt}
                    dailyFee={rentalDailyFee}
                    fixedFee={rentalFixedFee}
                    totalAmount={totalAmount}
                />
                }
            </Modal>
            }
            <div className={classes['card-container']}>
                <button
                    data-modal="delete"
                    className={`${classes[`delete-card`]} ${!future && 'hide'}`}
                    onClick={handleSelectModal}
                >
                    &times;
                </button>
                {/*First element*/}
                <SlideShow images={images}/>
                <div className={classes['details-container']}>
                    {/*Second element*/}
                    <section onClick={goAdvertisementPage} className={classes['details-section']}>
                        <span className={classes.dates}>
                            {`${formatDayMonthYearDate(new Date(from), {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })} - ${formatDayMonthYearDate(new Date(to), {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}`}
                        </span>
                        <span className="card-title">{city}</span>
                        <span className={classes.price}>{`Prezzo totale ${formatNumber(totalAmount)}`}</span>
                    </section>
                    {/*Third element (optional)*/}
                    <section className={`${classes['optional-section']} ${active && 'hide'}`}>
                        <button
                            data-modal="dates"
                            className={`${classes.option} ${!future && 'hide'}`}
                            onClick={handleSelectModal}
                        >
                            Modifica date
                        </button>
                        <button
                            data-modal="bill"
                            className={`${classes.option} ${!previous && 'hide'}`}
                            onClick={handleSelectModal}
                        >
                            Mostra fattura
                        </button>
                        <button
                            data-modal="review"
                            className={`${classes.option} ${!previous && "hide"}`}
                            onClick={handleSelectModal}
                        >
                            {isReviewed ? 'Mostra recensione' : 'Lascia recensione'}
                        </button>
                    </section>
                </div>
            </div>
        </>
    );
};

export default RentalCard;
