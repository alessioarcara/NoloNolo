import SplitScreenLayout from "../UI/Layout/SplitScreenLayout/SplitScreenLayout";
import NewAdvertisementFooter from "./NewAdvertisementFooter/NewAdvertisementFooter";

const NewBoatAdvertisement = () => {
    const title = <h1>Ora, descrivi il tuo annuncio</h1>

    return (
        <SplitScreenLayout
            contentLeft={title}
            actions={<NewAdvertisementFooter stepPosition={3}/>}
        />
    );
}

export default NewBoatAdvertisement;
