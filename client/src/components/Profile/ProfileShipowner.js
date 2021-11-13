import ProfileOption from "./ProfileOption";
import AdvertisementIcon from "../UI/icons/ProfileIcons/AdvertisementIcon";
import BoatIcon from "../UI/icons/ProfileIcons/BoatIcon";

const ProfileShipowner = () => {
    return (
        <>
            <ProfileOption
                title="Barche"
                content="Visualizza lo storico dei tuoi noleggi e le relative informazioni di fatturazione"
                icon={<BoatIcon/>}
            />
            <ProfileOption
                title="Annunci"
                content="Visualizza lo storico dei tuoi noleggi e le relative informazioni di fatturazione"
                icon={<AdvertisementIcon/>}
            />
        </>
    )
}

export default ProfileShipowner;
