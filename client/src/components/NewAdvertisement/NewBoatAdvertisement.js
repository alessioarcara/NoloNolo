import SplitScreenLayout from "../UI/Layout/SplitScreenLayout/SplitScreenLayout";
import NewAdvertisementFooter from "./NewAdvertisementFooter/NewAdvertisementFooter";
import {useNavigate} from "react-router-dom";
import useForm from "../../hooks/use-form";
import {boatAdvertisementForm} from "../../helpers/formConfig";
import {body_publishAdvertisement} from "../../helpers/httpConfig";

const NewBoatAdvertisement = ({onChangeUserBoat}) => {
    const navigate = useNavigate()
    const {formValues, renderFormInputs} = useForm(boatAdvertisementForm)

    const submitFormHandler = evt => {
        evt.preventDefault()
        onChangeUserBoat(body_publishAdvertisement({
            description: formValues[0],
            dailyFee: parseFloat(formValues[1]),
            fixedFee: parseFloat(formValues[2])
            })
        )
        navigate(`/profile`, {replace: true})
    }

    const title = <h1>Ora, descrivi il tuo annuncio</h1>
    const content = (
        <form onSubmit={submitFormHandler}>
            {renderFormInputs()}
            <NewAdvertisementFooter stepPosition={3}/>
        </form>
    )

    return (
        <SplitScreenLayout
            contentLeft={title}
            contentRight={content}
        />
    );
}

export default NewBoatAdvertisement;
