import React from "react";
import {boats} from "../../../helpers/elements";
import {MANAGE_BOATS} from "../../../helpers/constants";

const TypeFilter = ({dispatch}) => {
    const onCheckHandler = (boat) => {
        dispatch({type: MANAGE_BOATS, payload: boat})
    }

    return (
        <>
            <p className='filter-subtitle'>Scegli la barca che vuoi noleggiare:</p>
            <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                {
                    boats.map(boat => (
                        <div key={boat.id} onChange={() => onCheckHandler(boat)}>
                            <input
                                id={boat.id}
                                type='checkbox'
                                value={boat.name}
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