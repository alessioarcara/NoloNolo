import SplitScreenLayout from "../UI/Layout/SplitScreenLayout/SplitScreenLayout";
import useForm from "../../hooks/use-form";
import {boatForm} from "../../helpers/formConfig";
import BoatTypes from "../UI/Input/BoatTypes";

import classes from "./NewBoat.module.css"
import NewAdvertisementFooter from "./NewAdvertisementFooter/NewAdvertisementFooter";

const NewBoat = () => {
    const {formValues, renderFormInputs, isFormValid, resetForm} = useForm(boatForm)

    const title = <h1>Che tipo di barca offrirai?</h1>
    const content = (
        <>
            {renderFormInputs()}
            <BoatTypes/>
        </>
    )

    return (
        <SplitScreenLayout
            contentLeft={title}
            contentRight={content}
            actions={<NewAdvertisementFooter stepPosition={1}/>}
        />
    );
};

export default NewBoat;
