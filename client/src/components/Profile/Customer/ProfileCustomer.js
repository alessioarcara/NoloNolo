import ProfileOption from "../ProfileOption";
import classes from "./ProfileCustomer.module.css"
import RentalIcon from "../../UI/icons/ProfileIcons/RentalIcon";
import UserIcon from "../../UI/icons/ProfileIcons/UserIcon";

const ProfileCustomer = () => {

    return (
        <>
            <ProfileOption
                title="Informazioni personali"
                content="Inserisci o modifica i tuoi dati personali e i tuoi recapiti"
                icon={<UserIcon/>}
            />
            <ProfileOption
                title="Noleggi"
                content="Visualizza i tuoi noleggi attivi o futuri e modifica o cancella un noleggio futuro"
                icon={<RentalIcon/>}
            />
        </>
    )
}

export default ProfileCustomer;
