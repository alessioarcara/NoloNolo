import React, {useState} from "react";
import classes from './AnnouncementCard.module.css';
import SlideShow from "../../UI/SlideShow/SlideShow";
import {averageReviews, formatDayMonthYearDate, formatNumber} from "../../../helpers/utils";
import Modal from "../../UI/Modal/Modal";
import StarIcon from "../../UI/icons/StarIcon";
import HourglassIcon from "../../UI/icons/HourglassIcon";
import EyeIcon from "../../UI/icons/EyeIcon";
import DetailsModal from "./DetailsModal/DetailsModal";

const object = {
    model: "Regina IV",
    createdAt: formatDayMonthYearDate(new Date(), {day: "numeric", month: "long", year: 'numeric'}),
    future: 37,
    average: 4,
    reviews: 78,
    customer: "michael.carchesio@test.it",
    preferredBy: ["Alessio", "Alessia", "Michael"],
    images: [
        'https://www.ilmessaggero.it/photos/MED_HIGH/92/67/5519267_1942_foto_340_regina.jpg',
        'https://www.barchemagazine.com/wp-content/uploads/2021/05/FIM-340-Regina_01-800x600.jpg'
    ],
    from: formatDayMonthYearDate(new Date(2021,11,17), {year: 'numeric', month: 'short', day: 'numeric'}),
    to: formatDayMonthYearDate(new Date(2021,11,18), {year: 'numeric', month: 'short', day: 'numeric'}),
    totalAmount: formatNumber(1200)
}

const AnnouncementCard = ({model, reviews, rentals}) => {
    const [openDetailsModal, setOpenDetailsModal] = useState(false)

    const filterRentals = {
        previous: rentals.filter(rental => !rental.redelivery),
        active: rentals.filter(rental => new Date(rental.from) <= new Date() && new Date() <= new Date(rental.to)),
        future: rentals.filter(rental => new Date(rental.from) > new Date())
    }

    return (
        <>
            {openDetailsModal &&
                <Modal
                    closeModalHandler={() => setOpenDetailsModal(false)}
                >
                    <DetailsModal
                        previousRentals={filterRentals.previous ? filterRentals.previous : []}
                        activeRental={filterRentals.active ? filterRentals.active : []}
                        futureRentals={filterRentals.future ? filterRentals.future : []}
                    />
                </Modal>
            }

            <div className={classes['card-container']}>
                {/*First element*/}
                <div className={classes['delete-card']}>&times;</div>
                <SlideShow images={object.images}/>
                {/*Second element*/}
                <div className={classes['details-container']}>
                    <div className={classes['details-section']}>
                        <div className={classes['card-header']}>
                            <span className="card-title">{object.model}</span>
                            <div className={classes['average-reviews-container']}>
                                <StarIcon/>
                                <span>{reviews.length > 0 && averageReviews(reviews)}</span>
                                <span>{`(${reviews.length})`}</span>
                            </div>
                        </div>
                        <div>Creato il: <span className={classes.date}>{object.createdAt}</span></div>
                        <div>Prenotazioni future: <span className={classes.parameter}>{object.future}</span></div>
                        <div className={classes['grid-elements']}>
                            <div className={classes['eye-icon']}><EyeIcon/></div>
                            <div>Osservato da: <span className={classes.parameter}>{object.preferredBy.length} persone</span></div>
                        </div>

                        {object.customer &&
                        <div className={classes['grid-elements']}>
                            <div className={classes['hourglass-icon']}><HourglassIcon/></div>
                            <div>
                                Attualmente noleggiato da: <span className={classes.parameter}>{object.customer.split('@')[0]}</span>
                            </div>
                        </div>
                        }
                        <div className={classes['grid-elements']}>
                            <div
                                className={`${classes['point-icon']}
                                ${classes[object.customer ? 'icon-color-red' : 'icon-color-green']}`}
                            />
                            {object.customer
                                ? <div>Non disponibile</div>
                                : <div>Attualmente disponibile</div>
                            }
                        </div>
                    </div>
                    {/*Third element*/}
                    <div className={classes['option-section']}>
                        <button
                            className={classes['option']}
                            onClick={() => setOpenDetailsModal(true)}
                        >
                            Visualizza noleggi
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AnnouncementCard