import classes from './FeaturedBoatTypes.module.css';
import SailBoatIcon from "../../UI/icons/BoatIcons/SailBoatIcon";
import MotorBoatIcon from "../../UI/icons/BoatIcons/MotorBoatIcon";
import CatamaranIcon from "../../UI/icons/BoatIcons/CatamaranIcon";
import InflatableBoatIcon from "../../UI/icons/BoatIcons/InflatableBoatIcon";


const FeaturedBoatTypes = () => {
    return (
        <section>
            <div className="subtitle">Scegli la tipologia di barca</div>
            <div className={classes['boat-grid']}>
                <div className={classes.boat}>
                    <MotorBoatIcon/>
                    <p>Barca a motore</p>
                </div>
                <div className={classes.boat}>
                    <InflatableBoatIcon/>
                    <p>Gommone</p>
                </div>
                <div className={classes.boat}>
                    <CatamaranIcon/>
                    <p>Catamarano</p>
                </div>
                <div className={classes.boat}>
                    <SailBoatIcon/>
                    <p>Barca a vela</p>
                </div>
            </div>
        </section>
    );
};

export default FeaturedBoatTypes;
