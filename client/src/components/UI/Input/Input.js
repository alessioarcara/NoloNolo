import React from "react";
import classes from "./Input.module.css"

const Input = (props) => {
    const {
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
        <div className={inputClasses}>
            <label htmlFor={name}>{label}</label>
            <input type={type}
                   name={name}
                   value={value}
                   onChange={handleChange}
                   onBlur={handleBlur} />
            {hasErrors && (<span className={classes["error-text"]}>{errorMessage}</span>)}
        </div>
    )
}

export default React.memo(Input)
