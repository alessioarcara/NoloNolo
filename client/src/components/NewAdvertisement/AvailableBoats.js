import SplitScreenLayout from "../UI/Layout/SplitScreenLayout/SplitScreenLayout";
import {Link} from "react-router-dom";
import classes from "./AvailableBoats.module.css"
import {body_removeBoat} from "../../helpers/httpConfig";
import {useCallback} from "react";
import Tooltip from "../UI/Tooltip/Tooltip";

const AvailableBoats = ({userName, userBoats, onMutationUserBoat}) => {

    const handleDeleteUserBoat = useCallback(e => {
        e.preventDefault()
        e.stopPropagation()
        onMutationUserBoat(
            body_removeBoat({boatId: e.target.dataset.boatid}),
            (prevBoats, removedBoatId) => prevBoats.filter(userBoat => userBoat._id !== removedBoatId)
        )
    }, [onMutationUserBoat])

    return (
        <SplitScreenLayout
            layoutClassName={classes.layout}
            leftLayoutClassName={classes.leftLayout}
            rightLayoutContentClassName={classes['new-boat-options']}
            contentLeft={
                <div><h1>Ciao {userName && userName.split('@')[0]}, siamo felici di rivederti</h1></div>
            }
            contentRight={
                <div className={classes['available-boats']}>
                    <div className={classes["user-boats"]}>
                        <h3>Completa il tuo annuncio</h3>
                        <div className={classes['boats-container']}>
                            {userBoats ?
                                userBoats.map((boat, id) =>
                                    <Link
                                        key={boat._id}
                                        to={!boat.isRented ? `${boat._id}/boat` : `${boat._id}/advertisement`}
                                        className={classes["user-boat"]}>
                                        <div>Barca {id + 1}</div>
                                        <Tooltip
                                            isShownTooltip={boat.isRented}
                                            text="Non puoi cancellare una barca già noleggiata"
                                            positionTop={false}
                                        >
                                            <button
                                                disabled={boat.isRented}
                                                data-boatid={boat._id}
                                                onClick={handleDeleteUserBoat}
                                                className={`btn ${classes.cross}`}
                                            >
                                                &#10060;
                                            </button>
                                        </Tooltip>
                                    </Link>) :
                                <p>Ancora nessuna barca inserita</p>
                            }
                        </div>
                    </div>
                    <div className={classes["new-boat"]}>
                        <h3>Inizia ad aggiungere una nuova barca</h3>
                        <Link className={classes['add-boat']} to='boat'>Aggiungi una nuova barca</Link>
                    </div>
                    <Link to='/' className={`${classes['exit-btn']} btn btn-secondary`}>Esci</Link>
                </div>
            }
        />
    );
};

export default AvailableBoats;
