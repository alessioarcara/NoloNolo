import SplitScreenLayout from "../UI/Layout/SplitScreenLayout/SplitScreenLayout";
import {Link} from "react-router-dom";

import classes from "./AvailableBoats.module.css"
import {body_removeBoat} from "../../helpers/httpConfig";

const AvailableBoats = ({userName, userBoats, onMutationUserBoat}) => {

    const handleDeleteUserBoat = e => {
        e.preventDefault()
        e.stopPropagation()
        onMutationUserBoat(
            body_removeBoat({boatId: e.target.dataset.boatid}),
            (prevBoats, removedBoatId) => prevBoats.filter(userBoat => userBoat._id !== removedBoatId)
        )
    }

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
                            <button
                                data-boatid={boat._id}
                                onClick={handleDeleteUserBoat}
                                className={`btn ${classes.cross}`}>
                                &#10060;
                            </button>
                        </Link>) :
                    <p>Ancora nessuna barca inserita</p>}
            </div>
            <div className={classes["new-boat"]}>
                <h3>Inizia ad aggiungere una nuova barca</h3>
                <Link className={classes['add-boat']} to='boat'>Aggiungi una nuova barca</Link>
            </div>
        </>
    )
    return <SplitScreenLayout
                              rightLayoutContentClassName={classes['new-boat-options']}
                              contentLeft={title}
                              contentRight={content}/>;
};

export default AvailableBoats;
