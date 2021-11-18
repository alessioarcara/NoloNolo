import React, {useState} from "react";
import classes from './AnnouncementCard.module.css';
import SlideShow from "../../UI/SlideShow/SlideShow";
import {formatDayMonthYearDate, formatNumber} from "../../../helpers/utils";
import Modal from "../../UI/Modal/Modal";
import RentalRow from "./RentalsModal/RentalRow";
import StarIcon from "../../UI/icons/StarIcon";
import HourglassIcon from "../../UI/icons/HourglassIcon";
import EyeIcon from "../../UI/icons/EyeIcon";

const object = {
    model: "Regina IV",
    createdAt: formatDayMonthYearDate(new Date(), {day: "numeric", month: "long", year: 'numeric'}),
    future: 37,
    average: 4,
    reviews: 78,
    customer: "Massimo",
    preferredBy: ["Alessio", "Alessia", "Michael"],
    images: [
        'https://www.ilmessaggero.it/photos/MED_HIGH/92/67/5519267_1942_foto_340_regina.jpg',
        'https://www.barchemagazine.com/wp-content/uploads/2021/05/FIM-340-Regina_01-800x600.jpg'
    ],
    from: formatDayMonthYearDate(new Date(2021,11,17), {year: 'numeric', month: 'short', day: 'numeric'}),
    to: formatDayMonthYearDate(new Date(2021,11,18), {year: 'numeric', month: 'short', day: 'numeric'}),
    totalAmount: formatNumber(1200)
}

const AnnouncementCard = () => {
    const [openDetailsModal, setOpenDetailsModal] = useState(false)

    return (
        <>
            {openDetailsModal &&
                <Modal
                    closeModalHandler={() => setOpenDetailsModal(false)}
                    title={<div className={classes['modal-header']}><div>Passati</div><div>Attivi</div><div>Futuri</div></div>}
                >
                    <RentalRow
                        start={object.from}
                        end={object.to}
                        customer={object.customer}
                        totalAmount={object.totalAmount}
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
                                <span>{object.average}</span>
                                <span>{`(${object.reviews})`}</span>
                            </div>
                        </div>
                        <div>Creato il: <span className={classes.date}>{object.createdAt}</span></div>
                        <div>Prenotazioni future: <span className={classes.parameter}>{object.future}</span></div>
                        <div className={classes['inline-elements']}>
                            <EyeIcon/>
                            <div>Osservato da: <span className={classes.parameter}>{object.preferredBy.length} persone</span></div>
                        </div>

                        {object.customer &&
                        <div className={classes['inline-elements']}>
                            <div className={classes['hourglass-icon']}><HourglassIcon/></div>
                            <div>
                                Attualmente noleggiato da: <span className={classes.parameter}>{object.customer}</span>
                            </div>
                        </div>
                        }
                        <div className={classes['inline-elements']}>
                            <div
                                className={`${classes['point-icon']}
                                ${classes[object.customer ? 'icon-color-red' : 'icon-color-green']}`}
                            />
                            {object.customer ? <div>Non disponibile</div> : <div>Attualmente disponibile</div>}
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