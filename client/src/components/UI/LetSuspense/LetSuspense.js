import React, {Fragment, useEffect, useState} from "react";

const LetSuspense = ({
                         condition,
                         placeholder: Placeholder,
                         multiplier = 1,
                         initialDelay = 2000,
                         checkOnce,
                         children
                     }) => {
    const [component, setComponent] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (checkOnce && isChecked) {
            setComponent([children]);
            return;
        }

        /* create delayedTimeout for setTimeout */
        let delay = initialDelay || 0;
        let delayedTimeout = null

        /* send children with dispatch else send placeholder (from 0 to multiplier - 1) */
        if (condition) {
            if (delay) {
                delayedTimeout = setTimeout(() => {
                    setComponent([children])
                }, delay)
            } else {
                setComponent([children])
            }
            setIsChecked(true)
        } else {
            let tempComponent = []
            for (let i = 0; i < multiplier; i++) {
                tempComponent.push(<Placeholder key={i}/>)
            }
            setComponent([tempComponent])
        }

        /* Cleanup function to reset timeout */
        return () => {
            if (delayedTimeout) {
                clearTimeout(delayedTimeout)
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [condition, children])

    /* Print all components (placeholders or children) */
    return (
        <>
            {component.map((component, index) => (
                <Fragment key={index}>{component}</Fragment>
            ))}
        </>
    );

};

export default LetSuspense;
