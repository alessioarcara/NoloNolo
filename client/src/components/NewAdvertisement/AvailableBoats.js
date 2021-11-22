import SplitScreenLayout from "../UI/Layout/SplitScreenLayout/SplitScreenLayout";
import {Link} from "react-router-dom";

import classes from "./AvailableBoats.module.css"
import Button from "../UI/Button/Button";

const AvailableBoats = ({userName, userBoats, onDeleteUserBoat}) => {

    let title = <h1>Ciao {userName && userName.split('@')[0]}, siamo felici di rivederti</h1>
    let content = (
        <>
            <div className={classes["user-boats"]}>
                <h3>Completa il tuo annuncio</h3>
                {userBoats ?
                    userBoats.map((boat, id) =>
                        <Link
                            key={boat._id}
                            to={`${boat._id}/boat`}
                            className={classes["user-boat"]}>
                                Barca {id + 1}
                            <Button
                                onClick={evt => {
                                    evt.preventDefault()
                                    evt.stopPropagation()
                                    onDeleteUserBoat(boat._id)
                                }}
                                type="button"
                                className={`btn ${classes.cross}`}>
                                &#10060;
                            </Button>
                        </Link>) :
                    <p>Ancora nessuna barca inserita</p>}
            </div>
            <div className={classes["new-boat"]}>
                <h3>Inizia ad aggiungere una nuova barca</h3>
                <Link className={classes['add-boat']} to='boat'>Aggiungi una nuova barca</Link>
            </div>
        </>
    )
    return <SplitScreenLayout contentLeft={title} rightLayoutContentClassName={classes['new-boat-options']}
                              contentRight={content}/>;
};

export default AvailableBoats;
