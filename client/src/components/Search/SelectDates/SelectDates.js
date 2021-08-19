import classes from "./SelectDates.module.css";
import SearchActionButtons from "./SearchActionButtons";
import BackIcon from "../../UI/icons/BackIcon";
import SearchDatePicker from "./SearchDatePicker";
import {useCallback} from "react";

const SelectDates = ({moveClickHandler}) => {
    const cancelSelectionHandler = useCallback(() => {

    },[])
    const skipClickHandler = useCallback(() => {

    }, [])
    const goForwardClickHandler = useCallback(() => {

    }, [])

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