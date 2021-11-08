import React, {useCallback} from "react";
import classes from "./NumberSpinner.module.css"

const NumberSpinner = (props) => {
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

    const handleIncrease = useCallback(() => {
        handleChange({
            target: {
                name,
                value: value + 1
            }
        })
    }, [handleChange, name])

    const handleDecrease = useCallback(() => {
        handleChange({
            target: {
                name,
                value: value - 1
            }
        })
    }, [handleChange, name])


    return (
        <div className={inputClasses}>
            <label htmlFor={name}>{label}</label>
            <div>
                <button className={classes["decrease-btn"]} onClick={handleDecrease}>&#45;</button>
                <input type={type}
                       name={name}
                       value={value}
                       onChange={handleChange}
                       onBlur={handleBlur}/>
                <button className={classes["increase-btn"]} onClick={handleIncrease}>&#43;</button>
            </div>
            {hasErrors && (<span className={classes["error-text"]}>{errorMessage}</span>)}
        </div>
    )
}

export default React.memo(NumberSpinner)

