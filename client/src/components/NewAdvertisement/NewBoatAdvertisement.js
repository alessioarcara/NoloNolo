import SplitScreenLayout from "../UI/Layout/SplitScreenLayout/SplitScreenLayout";
import NewAdvertisementFooter from "./NewAdvertisementFooter/NewAdvertisementFooter";
import useForm from "../../hooks/use-form";
import {boatAdvertisementForm} from "../../helpers/formConfig";
import {body_publishAdvertisement} from "../../helpers/httpConfig";

const NewBoatAdvertisement = ({boatId, onMutationUserBoat}) => {
    const {formValues, renderFormInputs} = useForm(boatAdvertisementForm)

    const handlePublishAdvertisement = evt => {
        evt.preventDefault()
        onMutationUserBoat(
            body_publishAdvertisement({
                boatId,
                description: formValues[0],
                dailyFee: parseFloat(formValues[1]),
                fixedFee: parseFloat(formValues[2])
            }),
            undefined,
            () => `/profile`
        )
    }

    const title = <h1>Ora, descrivi il tuo annuncio</h1>
    const content = (
        <form onSubmit={handlePublishAdvertisement}>
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
