import SplitScreenLayout from "../UI/Layout/SplitScreenLayout/SplitScreenLayout";
import useForm from "../../hooks/use-form";
import {boatForm} from "../../helpers/formConfig";
import BoatTypes from "../UI/Input/BoatTypes";

import classes from "./NewBoat.module.css"
import NewAdvertisementFooter from "./NewAdvertisementFooter/NewAdvertisementFooter";
import {body_addBoat} from "../../helpers/httpConfig";

const NewBoat = ({onMutationUserBoat, boat}) => {
    const {formValues, renderFormInputs} = useForm(boat ?
        boatForm(boat.yard, boat.model, boat.length, boat.maximumCapacity) : boatForm()
    )

    const handleAddBoat = evt => {
        evt.preventDefault()
        onMutationUserBoat(
            body_addBoat({
                _id: boat && boat._id,
                yard: formValues[0],
                model: formValues[1],
                length: parseInt(formValues[2]),
                maximumCapacity: parseInt(formValues[3]),
                boatType: "dinghy",
            }),
            (prevBoats, newBoat) => {
                let isAlreadyAdded = false
                const updatedUserBoats = prevBoats.map(userBoat => {
                    if (userBoat._id === newBoat._id) {
                        isAlreadyAdded = true
                        return newBoat
                    }
                    return userBoat
                })
                return isAlreadyAdded ? updatedUserBoats : updatedUserBoats.concat(newBoat)
            },
            (newBoat) => `${newBoat._id}/location`
        )
    }

    const title = <h1>Che tipo di barca offrirai?</h1>
    const content = (
        <form onSubmit={handleAddBoat}>
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
