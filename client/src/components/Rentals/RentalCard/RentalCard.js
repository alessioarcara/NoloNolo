import SlideShow from "../../UI/SlideShow/SlideShow";
import {formatDayMonthYearDate, formatNumber} from "../../../helpers/utils";
import {useCallback, useContext, useReducer, useState} from "react";
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
                        onDeleteRental,
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
                        totalAmount
                    }) => {

    const breakpointCtx = useContext(BreakpointContext)

    const [openModal, setOpenModal] = useState("")
    const navigate = useNavigate()

    const {sendRequest} = useHttp()
    const {token} = useContext(AuthContext)

    const deleteRentalHandler = () => {
        sendRequest({
            body: body_deleteRental({rentalId}),
            token
        }, resData => resData.deleteRental)
        onDeleteRental(rentalId)
    }

    const goAdvertisementPage = useCallback(() => {
        navigate(`/boats/${boatId}`, {state: {startUrlDate: from, endUrlDate: to}})
    }, [navigate, boatId, from, to])

    return (
        <>
            {openModal !== "" &&
            <Modal
                closeModalHandler={() => setOpenModal("")}
                adapterSize={openModal === "dates" && breakpointCtx.breakpoint}
            >
                {openModal === "delete" &&
                <div className={classes['delete-section']}>
                    <p>Eliminare questo noleggio?</p>
                    <button
                        className={`btn btn-outline-primary ${classes['btn-confirm']}`}
                        onClick={deleteRentalHandler}
                    >
                        Conferma
                    </button>
                </div>
                }
                {openModal === "dates" &&
                <DatesModal
                    openModal={() => setOpenModal("")}
                    boatId={boatId}
                    start={from}
                    end={to}
                    fixedFee={fixedFee}
                    dailyFee={dailyFee}
                />
                }
                {openModal === "bill" &&
                <BoatBill
                    billNumber={billNumber}
                    from={from}
                    to={to}
                    boatData={boatData}
                    customer={customer}
                    createdAt={createdAt}
                    dailyFee={dailyFee}
                    fixedFee={fixedFee}
                    total={totalAmount}
                />
                }
                {openModal === "review" &&
                <ReviewModal/>
                }
            </Modal>
            }
            <div className={classes['card-container']}>
                <button
                    className={`${classes[`delete-card`]} ${!future && classes.hide}`}
                    onClick={() => setOpenModal("delete")}
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
                    <section className={`${classes['optional-section']} ${active && classes.hide}`}>
                        <button
                            className={`${classes.option} ${!future && classes.hide}`}
                            onClick={() => setOpenModal("dates")}
                        >
                            Modifica date
                        </button>
                        <button
                            className={`${classes.option} ${!previous && classes.hide}`}
                            onClick={() => setOpenModal("bill")}
                        >
                            Mostra fattura
                        </button>
                        <button
                            className={`${classes.option} ${!previous && classes.hide}`}
                            onClick={() => setOpenModal("review")}
                        >
                            Lascia recensione
                        </button>
                    </section>
                </div>
            </div>
        </>
    );
};

export default RentalCard;
