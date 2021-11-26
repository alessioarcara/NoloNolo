import ProfileOption from "./ProfileOption";
import RentalIcon from "../UI/icons/ProfileIcons/RentalIcon";
import UserIcon from "../UI/icons/ProfileIcons/UserIcon";

const ProfileCustomer = () => {
    return (
        <>
            <ProfileOption
                title="Informazioni personali"
                content="Inserisci o modifica i tuoi dati personali e i tuoi recapiti"
                link="user-info"
                icon={<UserIcon/>}
            />
            <ProfileOption
                title="Calendario dei noleggi"
                content="Visualizza i tuoi noleggi attivi o futuri e modifica o cancella un noleggio futuro"
                link="rentals"
                icon={<RentalIcon/>}
            />
        </>
    )
}

export default ProfileCustomer;
