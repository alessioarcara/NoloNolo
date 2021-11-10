import React from "react";

import classes from "./StepProgressBar.module.css"
import Step from "./Step";

const StepProgressBar = ({steps, stepPosition}) => {
    if (stepPosition > steps.length) {
        console.warn("When specifying a stepPosition prop, the number must be less or equal the length of the steps array.")
        return null
    }

    return (
        <div className={classes.progressBar}>
            {steps.map((name, i) =>
                i < stepPosition ? <Step key={i} name={name} fullfilled/> : <Step key={i} name={name}/>
            )}
        </div>
    )
}

export default StepProgressBar;
