import classes from "./SelectDates.module.css";
import ActionButtons from "../../UI/ActionButtons/ActionButtons";
import BackIcon from "../../UI/icons/BackIcon";
import SearchDatePicker from "./SearchDatePicker";
import {useCallback} from "react";
import {useHistory} from "react-router-dom";

const SelectDates = ({moveClickHandler}) => {
    const history = useHistory();

    const cancelSelectionHandler = useCallback(() => {

    },[])
    const skipClickHandler = useCallback(() => {
        history.push("/search")
    }, [history])
    const goForwardClickHandler = useCallback(() => {

    }, [])

    return (
        <div className={classes[`datepicker-container`]}>
            <ActionButtons
                actionClassName={classes[`actions-top`]}
                firstButtonClassName={classes[`btn-back`]}
                firstButtonClickHandler={moveClickHandler}
                firstButtonText={<BackIcon/>}
                secondButtonClassName={classes[`btn-cancel`]}
                secondButtonClickHandler={cancelSelectionHandler}
                secondButtonText='Cancella'
            />
            <SearchDatePicker/>
            <ActionButtons
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
