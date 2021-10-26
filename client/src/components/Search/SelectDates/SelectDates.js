import classes from "./SelectDates.module.css";
import ActionButtons from "../../UI/ActionButtons/ActionButtons";
import BackIcon from "../../UI/icons/BackIcon";
import SearchDatePicker from "./SearchDatePicker";
import {useCallback} from "react";
import {useState} from "react";
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import {formatDate} from "../../../helpers/utils";


const SelectDates = ({moveClickHandler, sendPlaceHandler}) => {
    const history = useHistory()
    const place = sendPlaceHandler.split(',')[0]
    const [startDate, setStartDate] = useState(new Date(), null)
    const [endDate, setEndDate] = useState(new Date(), null)

    const changeStartDateHandler = useCallback((start) => {
        setStartDate(start)
    }, []);

    const changeEndDateHandler = useCallback((end) => {
        setEndDate(end)
    }, [])

    const cancelSelectionHandler = useCallback(() => {
        setStartDate(null)
        setEndDate(null)
    }, [])

    const skipClickHandler = useCallback(() => {
        history.push(`/search?place=${place}`)
    }, [history, place])

    const goForwardClickHandler = useCallback(() => {
        history.push(`/search?place=${place}&start=${formatDate(startDate)}&end=${formatDate(endDate)}`)
    }, [history, place, startDate, endDate])

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
                    <li>lun</li>
                    <li>mar</li>
                    <li>mer</li>
                    <li>gio</li>
                    <li>ven</li>
                    <li>sab</li>
                    <li>dom</li>
                </ul>
            </div>
            <SearchDatePicker
                start={startDate}
                end={endDate}
                onChangeStartDate={changeStartDateHandler}
                onChangeEndDate={changeEndDateHandler}
            />
            <ActionButtons
                actionClassName={classes[`actions-bottom`]}
                firstButtonClassName={`btn btn-secondary ${classes[`btn-skip`]}`}
                firstButtonClickHandler={skipClickHandler}
                firstButtonText='Salta'
                secondButtonClassName={`btn btn-outline-primary ${classes['btn-forward']}`}
                secondButtonClickHandler={goForwardClickHandler}
                secondButtonText='Avanti'
                secondButtonDisabled={!startDate || !endDate || startDate.getTime() === endDate.getTime()}
            />
        </div>
    )
}

export default SelectDates;
