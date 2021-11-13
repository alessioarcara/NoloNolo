import SplitScreenLayout from "../UI/Layout/SplitScreenLayout/SplitScreenLayout";
import {Link} from "react-router-dom";

import classes from "./AvailableBoats.module.css"

const AvailableBoats = ({userName, boats}) => {

    let title = <h1>Ciao {userName}, siamo felici di rivederti</h1>
    let content = (
        <>
            <div className={classes["user-boats"]}>
                <h3>Completa il tuo annuncio</h3>
                {boats ? boats.map((boat, id) => <Link className={classes["user-boat"]} to={boat._id}>Barca {id}</Link>):
                <p>Ancora nessuna barca inserita</p>}
            </div>
            <div className={classes["new-boat"]}>
                <h3>Inizia ad aggiungere una nuova barca</h3>
                <Link className={classes['add-boat']} to='boat'>Aggiungi una nuova barca</Link>
            </div>
        </>
    )
    return <SplitScreenLayout contentLeft={title} rightLayoutContentClassName={classes['new-boat-options']} contentRight={content}/>;
};

export default AvailableBoats;
