import ProfileOption from "./ProfileOption";
import AdvertisementIcon from "../UI/icons/ProfileIcons/AdvertisementIcon";

const ProfileShipowner = () => {
    return (
        <ProfileOption
            title="Annunci"
            content="Visualizza lo storico dei tuoi noleggi e le relative informazioni di fatturazione"
            link="your-advertisements"
            icon={<AdvertisementIcon/>}
        />
    )
}

export default ProfileShipowner;
