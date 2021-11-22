import SplitScreenLayout from "../UI/Layout/SplitScreenLayout/SplitScreenLayout";
import useForm from "../../hooks/use-form";
import {boatForm} from "../../helpers/formConfig";
import BoatTypes from "../UI/Input/BoatTypes";

import classes from "./NewBoat.module.css"
import NewAdvertisementFooter from "./NewAdvertisementFooter/NewAdvertisementFooter";
import {body_addBoat} from "../../helpers/httpConfig";
import {useNavigate} from "react-router-dom";

const NewBoat = ({onChangeUserBoat, boat}) => {
    const navigate = useNavigate()
    const {formValues, renderFormInputs} = useForm(boat ?
        boatForm(boat.yard, boat.model, boat.length, boat.maximumCapacity) : boatForm()
    )

    const submitFormHandler = evt => {
        evt.preventDefault()
        onChangeUserBoat(body_addBoat({
            _id: boat && boat._id,
            yard: formValues[0],
            model: formValues[1],
            length: parseInt(formValues[2]),
            maximumCapacity: parseInt(formValues[3]),
            boatType: "dinghy",
        }))
        navigate(`../location`)
    }

    const title = <h1>Che tipo di barca offrirai?</h1>
    const content = (
        <form onSubmit={submitFormHandler}>
            {renderFormInputs()}
            <BoatTypes/>
            <NewAdvertisementFooter stepPosition={1}/>
        </form>
    )

    return (
        <SplitScreenLayout
            contentLeft={title}
            contentRight={content}
        />
    );
};

export default NewBoat;
