import ProfileOption from "../ProfileOption";
import classes from "./ProfileShipowner.module.css"

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
            <hr/>
            <ProfileOption
                title="LE TUE BARCHE"
            />
            <hr/>
            <ProfileOption
                title="Noleggi"
                content="Visualizza le prenotazioni future dei clienti o lo stato dei noleggi attivi, chiudi un noleggio attivo, retrodata un noleggio"
            />
            <hr/>
            <ProfileOption
                title="Storico noleggi della tua barca"
                content="Visualizza lo storico dei noleggi della tua barca e le relative informazioni di fatturazione"
            />
            <hr/>
            <ProfileOption
                title="Barche"
                content="Modifica le caratteristiche e le tariffe della tua barca e aggiungi, cancella o rendi indisponibile la tua barca"
            />
        </>
    )
}

export default ProfileShipowner;