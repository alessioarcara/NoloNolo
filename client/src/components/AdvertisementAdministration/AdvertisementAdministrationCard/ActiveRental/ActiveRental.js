import classes from './ActiveRental.module.css';
import {rangeDate, formatDayMonthYearDate} from "../../../../helpers/Utils/utils";
import CheckInIcon from "../../../UI/icons/CheckInIcon";
import HourglassIcon from "../../../UI/icons/HourglassIcon";
import {body_recordBoatReturn} from "../../../../helpers/httpConfig";
import {useCallback} from "react";
import ElementsNotFound from "../../../UI/ElementsNotFound/ElementsNotFound";
import Tooltip from "../../../UI/Tooltip/Tooltip";

const ActiveRental = ({activeRental, onMutateAdvertisement}) => {
    const handleRecordBoatReturn = useCallback(() => {
        onMutateAdvertisement(
            body_recordBoatReturn({rentalId: activeRental._id}),
            (prevAdvertisements, newRental) =>
                prevAdvertisements.map(advertisement => advertisement._id === newRental.boat._id ?
                    {
                        ...advertisement,
                        rentals: advertisement.rentals.map(prevRental => prevRental._id === newRental._id ?
                            newRental : prevRental)
                    } :
                    advertisement)
        )
    }, [activeRental, onMutateAdvertisement])

    return (
        <div className={classes['container']}>
            {activeRental
                ? <div className={classes['active-container']}>
                    <div className={classes['email']}>{activeRental.customer.email.split('@')[0]}</div>
                    <div className={classes['days-left']}>
                        <HourglassIcon/>
                        <div className={classes['text-style']}>
                            {`
                                    ${rangeDate(new Date(), activeRental.to) !== 0
                                ? Math.abs(rangeDate(new Date(), activeRental.to))
                                : ''
                            }
                                    ${rangeDate(new Date(), activeRental.to) === -1
                                ? "giorno in ritardo"
                                : rangeDate(new Date(), activeRental.to) < 0
                                    ? "giorni in ritardo"
                                    : rangeDate(new Date(), activeRental.to) === 1
                                        ? "giorno al termine"
                                        : rangeDate(new Date(), activeRental.to) === 0
                                            ? "terminato oggi"
                                            : "giorni al termine"
                            }
                                `}
                        </div>
                    </div>
                    <div className={classes['dates']}>
                        <CheckInIcon/>
                        <div className={classes['text-style']}>
                            {`
                                    ${formatDayMonthYearDate(activeRental.from, {day: 'numeric', month: 'short'})} - 
                                    ${formatDayMonthYearDate(activeRental.to, {day: 'numeric', month: 'short'})}
                                `}
                        </div>
                    </div>
                    <Tooltip text="Chiudi noleggio attivo">
                        <button
                            className={`${classes['close-btn']} btn btn-primary`}
                            disabled={rangeDate(new Date(), activeRental.to) > 0}
                            title="Chiudi noleggio al termine"
                            onClick={handleRecordBoatReturn}
                        >
                            Chiudi
                        </button>
                    </Tooltip>
                </div>
                : <ElementsNotFound warningText="Noleggio attivo non presente..." hasBackdrop={false}/>
            }
        </div>
    );
}

export default ActiveRental
