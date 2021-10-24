import classes from "./SelectDates.module.css";
import SearchActionButtons from "./SearchActionButtons";
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
        // ora 'search' si chiama 'results'
        history.push(`/results?place=${place}`)
    }, [history, place])

    const goForwardClickHandler = useCallback(() => {
        history.push(`/results?place=${place}&start=${startingDate}&end=${endingDate}`)
    }, [history, place, startingDate, endingDate])

    return (
        <div className={classes[`datepicker-container`]}>
            <SearchActionButtons
                actionClassName={classes[`actions-top`]}
                firstButtonClassName={classes[`btn-back`]}
                firstButtonClickHandler={moveClickHandler}
                firstButtonText={<BackIcon/>}
                secondButtonClassName={classes[`btn-cancel`]}
                secondButtonClickHandler={cancelSelectionHandler}
                secondButtonText='Cancella'
            />
            <SearchDatePicker/>
            <SearchActionButtons
                actionClassName={classes[`actions-bottom`]}
                firstButtonClassName={classes[`btn-skip`]}
                firstButtonClickHandler={skipClickHandler}
                firstButtonText='Salta'
                secondButtonClassName={classes[`btn-forward`]}
                secondButtonClickHandler={goForwardClickHandler}
                secondButtonText='Avanti'
            />
        </div>
    )
}

export default SelectDates;
