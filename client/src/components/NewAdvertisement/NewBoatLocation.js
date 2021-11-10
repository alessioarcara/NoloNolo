import SplitScreenLayout from "../UI/Layout/SplitScreenLayout/SplitScreenLayout";
import NewAdvertisementFooter from "./NewAdvertisementFooter/NewAdvertisementFooter";

const NewBoatLocation = () => {
    const title = <h1>Dove si trova la tua barca?</h1>

    return (
        <SplitScreenLayout
            contentLeft={title}
            actions={<NewAdvertisementFooter stepPosition={2}/>}
        />
    );
};

export default NewBoatLocation;
