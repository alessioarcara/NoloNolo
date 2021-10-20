import React from "react";

const TypeFilter = () => {
    return (
        <>
            <p className='filter-subtitle'>Scegli la barca che vuoi noleggiare:</p>
            <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                <div><input type='radio' name='btn-group' value='Barche a motore'/> Barche a motore</div>
                <div><input type='radio' name='btn-group' value='Barche a vela'/> Barche a vela</div>
                <div><input type='radio' name='btn-group' value='Catamarani'/> Catamarani</div>
                <div><input type='radio' name='btn-group' value='Gommoni'/> Gommoni</div>
            </div>
        </>
    );
};

export default TypeFilter;