import {Fragment, useEffect, useState} from "react";

const LetSuspense = ({
                         condition,
                         placeholder: Placeholder,
                         multiplier,
                         initialDelay,
                         checkOnce,
                         children}) => {
    const [component, setComponent] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (checkOnce && isChecked) {
            setComponent([children])
            return ;
        }

        let delay = initialDelay || 0;
        let delayedTimeout = null;

        if (condition) {
            if (initialDelay) {
                delayedTimeout = setTimeout(() => {
                    setComponent([children]);
                }, delay);
            } else {
                setComponent([children]);
            }
            setIsChecked(true);
        } else {
            let tempComponent = [];
            multiplier = multiplier || 1;

            for (let i = 0; i< multiplier; i++) {
                tempComponent.push(<Placeholder key={i}/>);
            }
            setComponent(tempComponent);
        }
        return () => {
            if (delayedTimeout) {
                clearTimeout(delayedTimeout);
            }
        };
    }, [condition, children]);

    return (
        <>
            {component.map((component, index) => (
                <Fragment key={index}>{component}</Fragment>
            ))}
        </>
    );

};

export default LetSuspense;