import React, {useCallback} from "react";
import classes from "./Input.module.css"
import numberSpinnerClasses from "./NumberSpinner.module.css"

const NumberSpinner = (props) => {
    const {
        label,
        type,
        name,
        handleChange,
        valueChange,
        handleBlur,
        errorMessage,
        isValid,
        isTouched,
        value,
        classNames
    } = props;

    const hasErrors = isTouched && !isValid
    const inputClasses = hasErrors ? `${classNames} ${classes.invalid}` : `${classNames}`

    const handleIncrease = useCallback((value) => {
        handleChange({
            target: {
                name,
                value:
                    isNaN(value) ? valueChange :
                    value + valueChange > valueChange * 100 ? value :
                    value + valueChange
            }
        })
    }, [handleChange, name, valueChange])

    const handleDecrease = useCallback((value) => {
        handleChange({
            target: {
                name,
                value:
                    isNaN(value) ? 0 :
                    value - valueChange < 0 ? 0 :
                    value - valueChange
            }
        })
    }, [handleChange, name, valueChange])


    return (
        <div className={`${classes.control} ${inputClasses}`}>
            <label htmlFor={name}>{label}</label>
            <div className={numberSpinnerClasses.numberSpinner}>
                <button type="button"
                        disabled={value <= 0}
                        className={numberSpinnerClasses["decrease-btn"]}
                        onClick={handleDecrease.bind(this, parseInt(value))}>&#45;
                </button>
                <input type={type}
                       name={name}
                       value={value}
                       onChange={handleChange}
                       onBlur={handleBlur}/>
                <button type="button"
                        disabled={value >= valueChange * 100}
                        className={numberSpinnerClasses["increase-btn"]}
                        onClick={handleIncrease.bind(this, parseInt(value))}>
                    &#43;
                </button>
            </div>
            {/*{hasErrors && (<span className={classes["error-text"]}>{errorMessage}</span>)}*/}
        </div>
    )
}

export default React.memo(NumberSpinner)

