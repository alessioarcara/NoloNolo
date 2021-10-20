import React, { useState } from "react";

const TypeFilter = () => {
    const [isChecked, setIsChecked] = useState ('')

    const onCheckHandler = (evt) => {
        setIsChecked (evt.target.value)
    }

    console.log(isChecked)

    return (
        <>
            <p className='filter-subtitle'>Scegli la barca che vuoi noleggiare:</p>
            <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                <div onChange={onCheckHandler}>
                    <input
                        id='motor'
                        type='radio'
                        name='btn-group'
                        value='Barche a motore'
                    />
                    <label htmlFor='motor'>Barche a motore</label>
                </div>
                <div>
                    <input
                        id='sail'
                        type='radio'
                        name='btn-group'
                        value='Barche a vela'
                        onChange={onCheckHandler}
                    />
                    <label htmlFor='sail'>Barche a vela</label>
                </div>
                <div>
                    <input
                        id='catamaran'
                        type='radio'
                        name='btn-group'
                        value='Catamarani'
                    />
                    <label htmlFor='catamaran'>Catamarani</label>
                </div>
                <div>
                    <input
                        id='rubber'
                        type='radio'
                        name='btn-group'
                        value='Gommoni'
                    />
                    <label htmlFor='rubber'>Gommone</label>
                </div>
            </div>
        </>
    );
};

export default TypeFilter;