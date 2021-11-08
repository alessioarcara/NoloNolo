import SplitScreenLayout from "../UI/Layout/SplitScreenLayout/SplitScreenLayout";
import useForm from "../../hooks/use-form";
import {boatForm} from "../../helpers/formConfig";
import classes from "../Auth/AuthForm.module.css";
import ActionButtons from "../UI/ActionButtons/ActionButtons";

const NewBoat = () => {

    const title = <h1>Che tipo di barca offrirai?</h1>

    const submitHandler = () => {
        resetForm()
    };

    const {formValues, renderFormInputs, isFormValid, resetForm} = useForm(boatForm)
    return (
        <SplitScreenLayout
            contentLeft={title}
            contentRight={renderFormInputs(classes.control)}
            actions={<ActionButtons/>}
        />
    );
};

export default NewBoat;
