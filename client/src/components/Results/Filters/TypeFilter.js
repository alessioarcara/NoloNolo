import React from "react";
import {boats} from "../../../helpers/elements";
import {MANAGE_BOATS} from "../../../helpers/constants";

const TypeFilter = ({dispatch, types}) => {
    const onCheckHandler = (typeName) => {
        dispatch({type: MANAGE_BOATS, payload: typeName})
    }

    return (
        <>
            <p className='filter-subtitle'>Scegli la barca che vuoi noleggiare:</p>
            <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
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
                            <label htmlFor={boat.id}> {boat.name}</label>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default TypeFilter;