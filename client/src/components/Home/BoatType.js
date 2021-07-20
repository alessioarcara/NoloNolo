import classes from './BoatType.module.css';
import SailBoatIcon from "../UI/icons/SailBoatIcon";
import BoatIcon from "../UI/icons/BoatIcon";
import CatamaranIcon from "../UI/icons/CatamaranIcon";
import InflatableBoatIcon from "../UI/icons/InflatableBoatIcon";

const BoatType = () => {
    return (
        <>
            <div className={`${classes.top} ${'subtitle'}`}>Scegli la tipologia di barca</div>
            <div className={classes['boat-grid']}>
                <div className={classes.boat}>
                    <BoatIcon/>
                    <p>Barca a motore</p>
                </div>
                <div className={classes.boat}>
                    <SailBoatIcon/>
                    <p>Barca a vela</p>
                </div>
                <div className={classes.boat}>
                    <CatamaranIcon/>
                    <p>Catamarano</p>
                </div>
                <div className={classes.boat}>
                    <InflatableBoatIcon/>
                    <p>Gommone</p>
                </div>
            </div>
        </>
    );
};

export default BoatType;