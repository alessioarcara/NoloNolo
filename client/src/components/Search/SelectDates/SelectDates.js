import classes from "./SelectDates.module.css";
import ActionButtons from "../../UI/ActionButtons/ActionButtons";
import BackIcon from "../../UI/icons/BackIcon";
import SearchDatePicker from "./SearchDatePicker";
import {useCallback} from "react";
import {useHistory} from "react-router-dom/cjs/react-router-dom";


const SelectDates = ({moveClickHandler, sendPlaceHandler}) => {
    const history = useHistory()
    const place = sendPlaceHandler.split(',')[0]
    const startingDate = ''
    const endingDate = ''

    const cancelSelectionHandler = useCallback(() => {

    },[])

    const skipClickHandler = useCallback(() => {
        history.push(`/search?place=${place}`)
    }, [history, place])

    const goForwardClickHandler = useCallback(() => {
        history.push(`/search?place=${place}&start=${startingDate}&end=${endingDate}`)
    }, [history, place, startingDate, endingDate])

    return (
        <div className={classes[`datepicker-container`]}>
            <div className={classes["header-datepicker"]}>
                <ActionButtons
                    actionClassName={classes[`actions-top`]}
                    firstButtonClassName={`btn ${classes[`btn-back`]}`}
                    firstButtonClickHandler={moveClickHandler}
                    firstButtonText={<BackIcon/>}
                    secondButtonClassName={`btn btn-secondary ${classes[`btn-cancel`]}`}
                    secondButtonClickHandler={cancelSelectionHandler}
                    secondButtonText='Cancella'
                />
                <ul className={classes["days-text"]}>
                    <li>Su</li>
                    <li>Mo</li>
                    <li>Tu</li>
                    <li>We</li>
                    <li>Th</li>
                    <li>Fr</li>
                    <li>Sa</li>
                </ul>
            </div>
            <SearchDatePicker/>
            <ActionButtons
                actionClassName={classes[`actions-bottom`]}
                firstButtonClassName={`btn btn-secondary ${classes[`btn-skip`]}`}
                firstButtonClickHandler={skipClickHandler}
                firstButtonText='Salta'
                secondButtonClassName={`btn btn-outline-primary ${classes['btn-forward']}`}
                secondButtonClickHandler={goForwardClickHandler}
                secondButtonText='Avanti'
            />
        </div>
    )
}

export default SelectDates;
