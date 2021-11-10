import classes from './BoatDetails.module.css';
import GroupIcon from "../../../UI/icons/GroupIcon";
import RulerIcon from "../../../UI/icons/RulerIcon";
import Dinghy from "../../../UI/icons/BoatIcons/InflatableBoatIcon"
import Motorboat from "../../../UI/icons/BoatIcons/MotorBoatIcon";
import Sailboat from "../../../UI/icons/BoatIcons/SailBoatIcon";
import Catamaran from "../../../UI/icons/BoatIcons/CatamaranIcon";
import ShipyardIcon from "../../../UI/icons/ShipyardIcon";

const BoatDetails = ({yard, length, maximumCapacity, type}) => {

    const boatTypes = {
        motorboat: <Motorboat/>,
        sailboat: <Sailboat/>,
        catamaran: <Catamaran/>,
        dinghy: <Dinghy/>
    }

    return (
        <>
            <div className={classes[`details-title`]}>Specifiche</div>
            <div className={classes.details}>
                <div className={classes['details-layout']}><ShipyardIcon/>{yard}</div>
                <div className={`${classes['details-layout']} ${classes['boat-svg']}`}>{boatTypes[type]} Tipologia</div>
                <div className={classes['details-layout']}><GroupIcon/>{maximumCapacity} persone</div>
                <div className={classes['details-layout']}><RulerIcon/>{length}m</div>
            </div>
            <hr/>
        </>
    );
}

export default BoatDetails
