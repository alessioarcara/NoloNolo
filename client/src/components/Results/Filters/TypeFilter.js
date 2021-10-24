import React from "react";
import {boats} from "../../../helpers/elements";
import {MANAGE_BOATS} from "../../../helpers/constants";
import classes from "./TypeFilter.module.css";

const TypeFilter = ({dispatch, types}) => {
    const onCheckHandler = (typeName) => {
        dispatch({type: MANAGE_BOATS, payload: typeName})
    }

    return (
        <div className={'border-space'}>
            <p className={classes['filter-subtitle']}>Scegli la barca che vuoi noleggiare:</p>
            <div className={classes['container-type']}>
                {
                    boats.map(boat => (
                        <div key={boat.id}>
                            <input
                                id={boat.id}
                                type='checkbox'
                                onChange={() => onCheckHandler(boat.name)}
                                /*
                                * Se la lista boatTypes in useReducer non contiene l'elemento corrente unchecked
                                * altrimenti sarà checked
                                */
                                checked={types.some(type => type === boat.name)}
                            />
                            <label className={classes.label} htmlFor={boat.id}>{boat.avatar}</label>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default TypeFilter;