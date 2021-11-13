import {boats} from "../../../helpers/elements";
import Input from "./Input";

import classes from "./BoatTypes.module.css"

const BoatTypes = () => {

    return (
        <div className={classes.control}>
            <div>Boat type</div>
            <div className={classes.boatTypes}>
                {boats.map(boat =>
                    <Input
                        key={boat.id}
                        id={boat.name}
                        name="boatType"
                        type="radio"
                        label={boat.avatar}
                    />
                )}
            </div>
        </div>
    );
}

export default BoatTypes;
