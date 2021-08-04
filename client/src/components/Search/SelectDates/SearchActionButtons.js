import React from "react";
import Button from "../../UI/Button/Button";

const SearchActionButtons = props => {
    const {
        actionClassName,
        firstButtonClassName,
        firstButtonClickHandler,
        firstButtonText,
        secondButtonClassName,
        secondButtonClickHandler,
        secondButtonText
    } = props
    return (
        <div className={actionClassName}>
            <Button className={firstButtonClassName} onClick={firstButtonClickHandler} type="button">
                {firstButtonText}
            </Button>
            <Button className={secondButtonClassName} onClick={secondButtonClickHandler} type="button">
                {secondButtonText}
            </Button>
        </div>
    )
}

export default SearchActionButtons;
