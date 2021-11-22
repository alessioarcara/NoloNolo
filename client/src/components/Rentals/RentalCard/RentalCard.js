import SlideShow from "../../UI/SlideShow/SlideShow";
import {formatDayMonthYearDate, formatNumber} from "../../../helpers/utils";
import {useCallback, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import Modal from "../../UI/Modal/Modal";
import BreakpointContext from "../../../store/breakpoint-context";
import DatesModal from "./DatesModal/DatesModal";
import BoatBill from "../../Advertisement/BoatBill/BoatBill";
import ReviewModal from "../RentalCard/ReviewModal/ReviewModal";
import useHttp from "../../../hooks/use-http";
import {body_deleteRental} from "../../../helpers/httpConfig";
import AuthContext from "../../../store/auth-context";
import classes from './RentalCard.module.css';

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
                        dailyFee,
                        fixedFee,
                        totalAmount,
                        reviews
                    }) => {

    const breakpointCtx = useContext(BreakpointContext)

    const [openModal, setOpenModal] = useState("")
    const navigate = useNavigate()

    const handleUpdateRental = useCallback((body, applyData) => {
        onUpdateOrDeleteRentals(body, applyData)
        setModal("")
    }, [onUpdateOrDeleteRentals])

    const handleDeleteRental = () => {
        onUpdateOrDeleteRentals(
            body_deleteRental({rentalId}),
            (prevRentals, newRentalId) => prevRentals.filter(userRental => userRental._id !== newRentalId)
        )
    }

    const goAdvertisementPage = useCallback(() => {
        navigate(`/boats/${boatId}`, {state: {startUrlDate: from, endUrlDate: to}})
    }, [navigate, boatId, from, to])

    const isReview = useCallback(() => {
        return reviews.some(review => review.creator._id === customer._id)
    }, [reviews, customer._id])

    return (
        <>
            {modal !== "" &&
            <Modal
                closeModalHandler={() => setOpenModal("")}
                adapterSize={openModal === "dates" && breakpointCtx.breakpoint}
            >
                {modal === "review" &&
                <ReviewModal
                    rentalId={rentalId}
                    customerId={customer._id}
                    reviews={reviews}
                    onPublishReview={handleUpdateRental}
                    isReview={isReview}
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
                    fixedFee={fixedFee}
                    dailyFee={dailyFee}
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
                    dailyFee={dailyFee}
                    fixedFee={fixedFee}
                    total={totalAmount}
                />
                }
            </Modal>
            }
            <div className={classes['card-container']}>
                <button
                    className={`${classes[`delete-card`]} ${!future && 'hide'}`}
                    onClick={handleSelectModal.bind(this, "delete")}
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
                            className={`${classes.option} ${!future && 'hide'}`}
                            onClick={handleSelectModal.bind(this, "dates")}
                        >
                            Modifica date
                        </button>
                        <button
                            className={`${classes.option} ${!previous && 'hide'}`}
                            onClick={handleSelectModal.bind(this, "bill")}
                        >
                            Mostra fattura
                        </button>
                        <button
                            className={`${classes.option} ${(!previous || isReview()) && "hide"}`}
                            onClick={handleSelectModal.bind(this, "review")}
                        >
                            Lascia recensione
                        </button>
                        <button
                            className={`${classes.option} ${(!previous || !isReview()) && "hide"}`}
                            onClick={handleSelectModal.bind(this, "review")}
                        >
                            Mostra recensione
                        </button>
                    </section>
                </div>
            </div>
        </>
    );
};

export default RentalCard;
