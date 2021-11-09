import SplitScreenLayout from "../UI/Layout/SplitScreenLayout/SplitScreenLayout";
import useForm from "../../hooks/use-form";
import {boatForm} from "../../helpers/formConfig";
import classes from "../Auth/AuthForm.module.css";
import ActionButtons from "../UI/ActionButtons/ActionButtons";
import BoatTypes from "../UI/Input/BoatTypes";

const NewBoat = () => {
    const {formValues, renderFormInputs, isFormValid, resetForm} = useForm(boatForm)

    const title = <h1>Che tipo di barca offrirai?</h1>
    const content = (
        <>
            {renderFormInputs(classes.control)}
            <BoatTypes/>
        </>
    )

    const submitHandler = () => {
        resetForm()
    };

    return (
        <SplitScreenLayout
            contentLeft={title}
            contentRight={content}
            actions={
                <ActionButtons
                    firstButtonText="Indietro"
                    secondButtonText="Avanti"
                />
            }
        />
    );
};

export default NewBoat;
