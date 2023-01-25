import React from "react";
import classes from "./Input.module.css"

const Input = (props) => {
    const {
        id,
        label,
        type,
        name,
        handleChange,
        handleBlur,
        errorMessage,
        isValid,
        isTouched,
        value,
        classNames
    } = props;

    const hasErrors = isTouched && !isValid
    const inputClasses = hasErrors ? `${classNames} ${classes.invalid}` : `${classNames}`

    return (
        <div className={`${inputClasses} ${classes.control}`}>
            <label htmlFor={id || name}>{label}</label>
            <input
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {hasErrors && (<span className={classes["error-text"]}>{errorMessage}</span>)}
        </div>
    )
}

export default React.memo(Input)
