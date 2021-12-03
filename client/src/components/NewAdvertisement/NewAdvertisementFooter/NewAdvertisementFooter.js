import React from "react";
import StepProgressBar from "../../UI/StepProgressBar/StepProgressBar";
import ActionButtons from "../../UI/ActionButtons/ActionButtons";
import {useNavigate} from "react-router-dom";

import classes from "./NewAdvertisementFooter.module.css"

const steps = ["Barca", "Posizione", "Annuncio"]

const NewAdvertisementFooter = ({isDisabledNextStep, stepPosition}) => {
    const navigate = useNavigate();

    const goBackHandler = () => {
        navigate(-1)
    }

    return (
        <div className={classes["newAdvertisement-footer"]}>
            <StepProgressBar steps={steps} stepPosition={stepPosition}/>
            <ActionButtons
                firstButtonText="Indietro"
                secondButtonText="Avanti"
                firstButtonClickHandler={goBackHandler}
                firstButtonClassName={`${classes["newAdvertisement-actionFirst"]} btn btn-secondary`}
                secondButtonClassName={`${classes["newAdvertisement-actionSecond"]} btn btn-outline-primary`}
                secondButtonDisabled={isDisabledNextStep}
                secondButtonType="submit"
            />
        </div>
    );
};

export default NewAdvertisementFooter;
