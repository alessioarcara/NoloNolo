import ProfileOption from "../ProfileOption";
import classes from "./ProfileCustomer.module.css"

const ProfileShipowner = () => {

    return (
        <>
            <ProfileOption
                title="Informazioni personali"
                content="Inserisci o modifica i tuoi dati personali e i tuoi recapiti"
            />
            <hr/>
            <ProfileOption
                title="Noleggi"
                content="Visualizza i tuoi noleggi attivi o futuri e modifica o cancella un noleggio futuro"
            />
            <hr/>
            <ProfileOption
                title="Storico noleggi"
                content="Visualizza lo storico dei tuoi noleggi e le relative informazioni di fatturazione"
            />
        </>
    )
}

export default ProfileShipowner;