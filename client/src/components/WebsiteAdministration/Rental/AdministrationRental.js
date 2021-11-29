import classes from './AdministrationRental.module.css';
import {formatDayMonthYearDate} from "../../../helpers/Utils/utils";
import {useCallback, useContext, useState} from "react";
import Modal from "../../UI/Modal/Modal";
import BreakpointContext from "../../../store/breakpoint-context";
import Dates from "../Dates/Dates";

const AdministrationRental = ({customer, rentalId, boatId, from, to, city, handleMutationAdministrationRentals}) => {
    const [datesModal, setDatesModal] = useState(false)
    const breakpointCtx = useContext(BreakpointContext)

    const handleDatesModal = useCallback(() => {
        setDatesModal(prevState => !prevState)
    }, [])

    return (
        <>
            {datesModal &&
                <Modal
                    adapterSize={breakpointCtx.breakpoint}
                    closeModalHandler={handleDatesModal}
                >
                    <Dates
                        handleDatesModal={handleDatesModal}
                        handleBackDateRentals={handleMutationAdministrationRentals}
                        rentalId={rentalId}
                        boatId={boatId}
                        from={from}
                        to={to}
                    />
                </Modal>
            }
            <div className={classes['rental-container']}>
                <div className={classes['customer-email']}>{customer.split('@')[0]}</div>
                <div className={classes['city-name']}>{city}</div>
                <div className={classes['rental-dates']}>
                    {`
                        ${formatDayMonthYearDate(from, {day: 'numeric', month: 'short', year: 'numeric'})} -
                        ${formatDayMonthYearDate(to, {day: 'numeric', month: 'short', year: 'numeric'})}
                    `}
                </div>
                <button
                    className={`${classes['retro-btn']} btn btn-primary`}
                    onClick={handleDatesModal}
                >
                    Retrodata
                </button>
            </div>
        </>
    )
}

export default AdministrationRental