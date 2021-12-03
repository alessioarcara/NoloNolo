import React from "react";
import {boats} from "../../../helpers/elements";
import classes from "./BoatTypes.module.css"

const BoatTypes = ({boatType, onCheckBoatType}) => {
    return (
        <div className={classes.control}>
            <div style={{margin: "1rem 0"}}>Tipologia</div>
            <div className={classes.boatTypes}>
                {boats.map(boat =>
                    <div key={boat.id}>
                        <input
                            id={boat.name}
                            onClick={onCheckBoatType}
                            value={boat.name}
                            name="boatType"
                            type="radio"
                            defaultChecked={boat.name === boatType}
                        />
                        <label className={classes['boat-label']} htmlFor={boat.name}>{boat.avatar}</label>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BoatTypes;
