import SplitScreenLayout from "../UI/Layout/SplitScreenLayout/SplitScreenLayout";
import NewAdvertisementFooter from "./NewAdvertisementFooter/NewAdvertisementFooter";
import BoatMapPosition from "../UI/Map/BoatMapPosition";

import classes from "./NewBoatLocation.module.css"

const NewBoatLocation = () => {
    const title = <h1>Dove si trova la tua barca?</h1>

    return (
        <SplitScreenLayout
            contentLeft={title}
            rightLayoutContentClassName={classes.map}
            contentRight={<BoatMapPosition boatPosition={[44.49712, 11.34448]}/>}
            actions={<NewAdvertisementFooter stepPosition={2}/>}
        />
    );
};

export default NewBoatLocation;
