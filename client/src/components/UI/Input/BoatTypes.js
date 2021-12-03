import React from "react";
import {boats} from "../../../helpers/elements";
import classes from "./BoatTypes.module.css"

const BoatTypes = ({boatType, onCheckBoatType}) => {
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
