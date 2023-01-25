import classes from "./TextArea.module.css";

const TextArea = (props) => {
    const {
        id,
        label,
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
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {hasErrors && (<span className={classes["error-text"]}>{errorMessage}</span>)}
        </div>
    )
}

export default TextArea;
