import React from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import classes from "./Fallback.module.css"

const Fallback = () => {
    return (
        <div className={classes.fallback}>
            <LoadingSpinner/>
        </div>
    )
}

export default React.memo(Fallback)
