import React from "react";
import Button from "../Button/Button";

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
        secondButtonType
    } = props
    return (
        <div className={actionClassName}>
            <Button
                className={firstButtonClassName}
                onClick={firstButtonClickHandler}
                disabled={firstButtonDisabled}
                type="button"
            >
                {firstButtonText}
            </Button>
            <Button
                className={secondButtonClassName}
                onClick={secondButtonClickHandler}
                type={secondButtonType || "button"}
            >
                {secondButtonText}
            </Button>
        </div>
    )
}

export default ActionButtons;
