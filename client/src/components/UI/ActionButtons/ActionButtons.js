import React from "react";
import Button from "../Button/Button";

import classes from "./ActionButton.module.css"

const ActionButtons = props => {
    const {
        actionClassName,
        firstButtonClassName,
        firstButtonClickHandler,
        firstButtonText,
        firstButtonDisabled,
        secondButtonClassName,
        secondButtonClickHandler,
        secondButtonText,
        secondButtonDisabled,
        secondButtonType
    } = props
    return (
        <div className={actionClassName || classes.actions}>
            <Button
                className={firstButtonClassName || classes['btn-first']}
                onClick={firstButtonClickHandler}
                disabled={firstButtonDisabled}
                type="button"
            >
                {firstButtonText}
            </Button>
            <Button
                className={`${secondButtonClassName} ${classes['btn-second']}`}
                onClick={secondButtonClickHandler}
                disabled={secondButtonDisabled}
                type={secondButtonType || "button"}
            >
                {secondButtonText}
            </Button>
        </div>
    )
}

export default ActionButtons;
