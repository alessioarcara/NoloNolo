import SplitScreenLayout from "../UI/Layout/SplitScreenLayout/SplitScreenLayout";
import NewAdvertisementFooter from "./NewAdvertisementFooter/NewAdvertisementFooter";
import BoatMapPosition from "../UI/Map/BoatMapPosition";

import classes from "./NewBoatLocation.module.css"
import useForm from "../../hooks/use-form";
import {boatLocationForm} from "../../helpers/formConfig";
import {body_insertBoatLocation} from "../../helpers/httpConfig";
import useGeocode from "../../hooks/use-geocode";

const NewBoatLocation = ({onMutationUserBoat, boat}) => {
    const {formValues, renderFormInputs, isFormValid} = useForm(boat && boat.isDocked ?
        boatLocationForm(boat.isDocked.harbour, boat.isDocked.city, boat.isDocked.region) : boatLocationForm()
    )
    const {coordinates} = useGeocode(formValues[2], formValues[1])
    console.log(boat)

    const handleInsertBoatLocation = evt => {
        evt.preventDefault()
        onMutationUserBoat(
            body_insertBoatLocation({
                boatId: boat._id,
                harbour: formValues[0],
                city: formValues[1],
                region: formValues[2],
                latitude: coordinates.lat,
                longitude: coordinates.lon
            }),
            (prevBoats, newBoat) => prevBoats.map(userBoat => userBoat._id === newBoat._id ? newBoat : userBoat),
            newBoat => `${newBoat._id}/advertisement`
        )
    }

    const formIsValid = isFormValid() && coordinates.lat && coordinates.lon

    const title = (
        <>
            <h1 className={classes.title}> Dove si trova la tua barca?</h1>
            <BoatMapPosition boatPosition={[coordinates.lat, coordinates.lon]}/>
        </>
    )

    const content = (
        <form onSubmit={handleInsertBoatLocation}>
            {renderFormInputs(classes.inputs)}
            <NewAdvertisementFooter isDisabledNextStep={!formIsValid} stepPosition={2}/>
        </form>
    )

    return (
            <SplitScreenLayout
                contentLeft={title}
                rightLayoutContentClassName={classes.map}
                contentRight={content}
            />
    );
};

export default NewBoatLocation;
