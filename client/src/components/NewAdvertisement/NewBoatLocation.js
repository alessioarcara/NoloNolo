import SplitScreenLayout from "../UI/Layout/SplitScreenLayout/SplitScreenLayout";
import NewAdvertisementFooter from "./NewAdvertisementFooter/NewAdvertisementFooter";
import BoatMapPosition from "../UI/Map/BoatMapPosition";

import classes from "./NewBoatLocation.module.css"
import useForm from "../../hooks/use-form";
import {boatLocationForm} from "../../helpers/formConfig";
import {body_insertBoatLocation} from "../../helpers/httpConfig";
import useGeocode from "../../hooks/use-geocode";

const NewBoatLocation = ({onChangeUserBoat, boat}) => {
    const {formValues, renderFormInputs} = useForm(boat && boat.isDocked ?
        boatLocationForm(boat.isDocked.harbour, boat.isDocked.city, boat.isDocked.region) : boatLocationForm()
    )
    const {coordinates} = useGeocode(formValues[2], formValues[1])

    const submitFormHandler = evt => {
        evt.preventDefault()
        onChangeUserBoat(body_insertBoatLocation({
            boatId: boat._id,
            harbour: formValues[0],
            city: formValues[1],
            region: formValues[2],
            latitude: coordinates.lat,
            longitude: coordinates.lon
        }))
    }

    const title = (
        <>
            <h1 className={classes.title}> Dove si trova la tua barca?</h1>
            <BoatMapPosition boatPosition={[coordinates.lat, coordinates.lon]}/>
        </>
    )

    const content = (
        <form onSubmit={submitFormHandler}>
            {renderFormInputs(classes.inputs)}
            <NewAdvertisementFooter stepPosition={2}/>
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
