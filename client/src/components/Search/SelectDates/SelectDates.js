import ActionButtons from "../../UI/ActionButtons/ActionButtons";
import BackIcon from "../../UI/icons/BackIcon";
import DayPicker from "../../UI/DatePicker/DayPicker";
import classes from "./SelectDates.module.css";

const SelectDates = ({
                         moveClickHandler,
                         changeStartDateHandler,
                         changeEndDateHandler,
                         searchClickHandler,
                         cancelSelectionHandler,
                         startDate,
                         endDate,
                         skipTextButton,
                         confirmTextButton,
                         alreadyRentedDates
                     }) => {

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
            <div className={classes[`day-picker`]}>
                <DayPicker
                    start={startDate}
                    end={endDate}
                    monthsShown={2}
                    onChangeStartDate={changeStartDateHandler}
                    onChangeEndDate={changeEndDateHandler}
                    alreadyRentedDates={alreadyRentedDates}
                />
            </div>
            <ActionButtons
                actionClassName={classes[`actions-bottom`]}
                firstButtonClassName={skipTextButton ? `btn btn-secondary ${classes[`btn-skip`]}` : classes.hide}
                firstButtonClickHandler={skipTextButton && searchClickHandler}
                firstButtonText={skipTextButton && skipTextButton}
                secondButtonClassName={`btn btn-outline-primary`}
                secondButtonClickHandler={searchClickHandler}
                secondButtonText={confirmTextButton ? confirmTextButton : 'Avanti'}
                secondButtonDisabled={!startDate || !endDate || startDate.getTime() === endDate.getTime()}
            />
        </div>
    )
}

export default SelectDates;
