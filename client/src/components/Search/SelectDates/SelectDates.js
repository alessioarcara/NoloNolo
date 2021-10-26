import classes from "./SelectDates.module.css";
import ActionButtons from "../../UI/ActionButtons/ActionButtons";
import BackIcon from "../../UI/icons/BackIcon";
import SearchDatePicker from "./SearchDatePicker";

const SelectDates = ({moveClickHandler, changeStartDateHandler, changeEndDateHandler,
                         searchClickHandler, cancelSelectionHandler, startDate, endDate}) => {

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
                firstButtonClickHandler={searchClickHandler}
                firstButtonText='Salta'
                secondButtonClassName={`btn btn-outline-primary ${classes['btn-forward']}`}
                secondButtonClickHandler={searchClickHandler}
                secondButtonText='Avanti'
                secondButtonDisabled={!startDate || !endDate || startDate.getTime() === endDate.getTime()}
            />
        </div>
    )
}

export default SelectDates;
