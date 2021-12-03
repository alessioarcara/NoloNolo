import SplitScreenLayout from "../UI/Layout/SplitScreenLayout/SplitScreenLayout";
import useForm from "../../hooks/use-form";
import {boatForm} from "../../helpers/formConfig";
import BoatTypes from "../UI/Input/BoatTypes";

import classes from "./NewBoat.module.css"
import NewAdvertisementFooter from "./NewAdvertisementFooter/NewAdvertisementFooter";
import {body_addBoat} from "../../helpers/httpConfig";
import {useCallback, useContext, useState} from "react";
import Spacer from "../UI/Spacer/Spacer";
import breakpointContext from "../../store/breakpoint-context";

const NewBoat = ({onMutationUserBoat, boat}) => {
    const [boatType, setBoatType] = useState(boat ? boat.boatType : "")
    const {formValues, renderFormInputs, isFormValid} = useForm(boat ?
        boatForm(boat.yard, boat.model, boat.length, boat.maximumCapacity) : boatForm()
    )
    const {breakpoint} = useContext(breakpointContext)

    const handleCheckBoatType = useCallback(({target: {value}}) =>
        setBoatType(value), [])

    const handleAddBoat = useCallback((evt) => {
        evt.preventDefault()
        onMutationUserBoat(
            body_addBoat({
                _id: boat && boat._id,
                yard: formValues[0],
                model: formValues[1],
                length: parseInt(formValues[2]),
                maximumCapacity: parseInt(formValues[3]),
                boatType,
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
    }, [formValues, boatType, boat, onMutationUserBoat])

    const formIsValid = isFormValid() && boatType

    return (
        <SplitScreenLayout
            layoutClassName={classes.layout}
            leftLayoutClassName={classes.leftLayout}
            rightLayoutClassName={classes.rightLayout}
            contentLeft={
                <h1>Che tipo di barca offrirai?</h1>
            }
            contentRight={
                <form onSubmit={handleAddBoat}>
                    {renderFormInputs()}
                    <BoatTypes boatType={boatType} onCheckBoatType={handleCheckBoatType}/>
                    {breakpoint === "smartphone" && <Spacer heightVh={20}/>}
                    <NewAdvertisementFooter isDisabledNextStep={!formIsValid} stepPosition={1}/>
                </form>
            }
        />
    );
};

export default NewBoat;
