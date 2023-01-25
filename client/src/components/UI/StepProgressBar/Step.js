import React from "react";

import classes from "./Step.module.css"

const Step = ({name, fullfilled}) => {
    return (
        <div className={`${classes.step} ${fullfilled ? classes.stepFullfilled : ''}`}>
            <div/>
            <p>{name}</p>
        </div>
    );
}

export default Step;
