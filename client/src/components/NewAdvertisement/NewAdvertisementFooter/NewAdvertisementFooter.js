import React from "react";
import StepProgressBar from "../../UI/StepProgressBar/StepProgressBar";
import ActionButtons from "../../UI/ActionButtons/ActionButtons";
import {useNavigate} from "react-router-dom";

import classes from "./NewAdvertisementFooter.module.css"

const steps = ["Boat", "Location", "Advertisement"]

const NewAdvertisementFooter = ({stepPosition}) => {
    const navigate = useNavigate();

    const goBackHandler = () => {
        navigate(-1)
    }
    const goForwardHandler = () => {
        navigate(`../${steps[stepPosition].toLowerCase()}`)
    }

    return (
        <div className={classes["newAdvertisement-footer"]}>
            <StepProgressBar steps={steps} stepPosition={stepPosition}/>
            <ActionButtons
                firstButtonText="Indietro"
                secondButtonText="Avanti"
                firstButtonClickHandler={goBackHandler}
                secondButtonClickHandler={goForwardHandler}
                firstButtonClassName={`${classes["newAdvertisement-actions"]} btn btn-secondary`}
                secondButtonClassName={`${classes["newAdvertisement-actions"]} btn btn-outline-primary`}
            />
        </div>
    );
};

export default NewAdvertisementFooter;
