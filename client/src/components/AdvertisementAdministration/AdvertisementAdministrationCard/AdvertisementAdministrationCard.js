import React, {useCallback, useMemo, useState} from "react";
import classes from './AdvertisementAdministrationCard.module.css';
import SlideShow from "../../UI/SlideShow/SlideShow";
import {averageReviews, formatDayMonthYearDate} from "../../../helpers/Utils/utils";
import Modal from "../../UI/Modal/Modal";
import StarIcon from "../../UI/icons/StarIcon";
import HourglassIcon from "../../UI/icons/HourglassIcon";
import EyeIcon from "../../UI/icons/EyeIcon";
import DetailsModal from "./DetailsModal/DetailsModal";
import {useLocation, useNavigate} from "react-router-dom";
import {body_withdrawAdvertisement} from "../../../helpers/httpConfig";
import ConfirmSection from "../../UI/ConfirmSection/ConfirmSection";

const AdvertisementAdministrationCard = ({
                                             boatId,
                                             model,
                                             reviews,
                                             createdAt,
                                             images,
                                             rentals,
                                             preferredBy,
                                             onMutateAdvertisement
                                         }) => {
    const [modal, setModal] = useState("")
    const handleChangeModalState = useCallback(
        evt => evt.target.dataset.modal
            ? setModal(evt.target.dataset.modal)
            : setModal(""), [])


    const navigate = useNavigate()
    const location = useLocation()

    const goAdvertisementPage = useCallback(() => {
        navigate(`/boats/${boatId}`, {state: {from: location}})
    }, [navigate, location, boatId])

    const filteredRentals = useMemo(() => {
        return {
            previous: rentals.filter(rental => rental.redelivery),
            active: rentals.filter(rental => new Date(rental.from) <= new Date() && !rental.redelivery),
            future: rentals.filter(rental => new Date(rental.from) > new Date())
        }
    }, [rentals])

    const handleDeleteAdvertisement = useCallback(() => {
        onMutateAdvertisement(
            body_withdrawAdvertisement({boatId}),
            (prevAdvertisements, prevAdvertisementId) =>
                prevAdvertisements.filter(advertisement => advertisement._id !== prevAdvertisementId)
        )
    }, [onMutateAdvertisement, boatId])

    return (
        <>
            {modal !== "" &&
                <Modal
                    closeModalHandler={handleChangeModalState}
                >
                    {modal === 'details' &&
                        <DetailsModal
                            onMutateAdvertisement={onMutateAdvertisement}
                            previousRentals={filteredRentals.previous}
                            activeRental={filteredRentals.active}
                            futureRentals={filteredRentals.future}
                        />
                    }
                    {modal === 'delete' &&
                        <ConfirmSection
                            text="Sicuro di eliminare questo annuncio?"
                            onConfirm={handleDeleteAdvertisement}
                        />
                    }
                </Modal>
            }
            <div className={classes['card-container']}>
                {/*First element*/}
                <div
                    className={classes['delete-card']}
                    data-modal="delete"
                    onClick={handleChangeModalState}
                >
                    &times;
                </div>
                <SlideShow images={images}/>
                {/*Second element*/}
                <div className={classes['details-container']}>
                    <div
                        className={classes['details-section']}
                        onClick={goAdvertisementPage}
                    >
                        {/* Boat title */}
                        <div className={classes['card-header']}>
                            <span className="card-title">{model}</span>
                            <div className={classes['average-reviews-container']}>
                                <StarIcon/>
                                <span>{reviews.length > 0 && averageReviews(reviews)}</span>
                                <span>{`(${reviews.length})`}</span>
                            </div>
                        </div>
                        {/* Announcement Creation Date */}
                        <div>Creato il: <span className={classes.date}>
                                {formatDayMonthYearDate(createdAt, {month: 'short', year: 'numeric'})}</span>
                        </div>
                        {/* Future Rentals */}
                        <div>Prenotazioni future: <span
                            className={classes.parameter}>{filteredRentals.future.length}</span>
                        </div>
                        {/* Number of Favorites */}
                        <div className={classes['grid-elements']}>
                            <div className={classes['eye-icon']}><EyeIcon/></div>
                            <div>Osservato da: <span className={classes.parameter}>{preferredBy} persone</span></div>
                        </div>
                        {/* Disponibility or Active Rental */}
                        {filteredRentals.active[0] ?
                            <div className={classes['grid-elements']}>
                                <div className={classes['hourglass-icon']}><HourglassIcon/></div>
                                <div>
                                    Attualmente noleggiato da: <span
                                    className={classes.parameter}>{filteredRentals.active[0].customer.email.split('@')[0]}</span>
                                </div>
                            </div>
                            :
                            <div className={classes['grid-elements']}>
                                <div className={classes['point-green-icon']}/>
                                <div>Attualmente disponibile</div>
                            </div>
                        }
                    </div>
                    {/*Third element*/}
                    <div className={classes['option-section']} data-modal="details" onClick={handleChangeModalState}>
                        Visualizza noleggi
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdvertisementAdministrationCard
