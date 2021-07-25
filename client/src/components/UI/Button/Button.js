import React from "react";
import classes from "./Button.module.css"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";


const Button = (props) => {
    const {type, className, onClick, disabled, isLoading, children} = props;

    return (
        <button
            type={type || 'submit'}
            className={className || classes.Button}
            onClick={onClick}
            disabled={disabled}
        >
            {isLoading ? <LoadingSpinner/> : children}
        </button>
    )
}

export default Button;
