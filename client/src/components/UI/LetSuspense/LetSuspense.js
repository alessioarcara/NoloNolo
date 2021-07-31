import React, {Fragment, useEffect, useReducer} from "react";

const initialState = { isChecked: false, component: [] }

const suspenseReducer = (state, action) => {
    switch (action.type) {
        case "CHILDREN": return { isChecked: true, component: action.component };
        case "PLACEHOLDER": return { isChecked: false, component: action.component };
        default: return initialState;
    }
}

const LetSuspense = ({
                         condition,
                         placeholder: Placeholder,
                         multiplier = 1,
                         delay = 0,
                         checkOnce,
                         children}) => {
    const [{component, isChecked} , dispatch] = useReducer(suspenseReducer, initialState)

    useEffect(() => {
        // checkOnce && dispatch( {type: "CHILDREN", component: [children]} )
        if (isChecked) { return; }

        let delayedTimeout = null;
        if (condition) {
            if (delay) {
                delayedTimeout = setTimeout(() => {
                    dispatch({type: "CHILDREN", component: [children]})
                }, delay);
            } else {
                dispatch({type: "CHILDREN", component: [children]})
            }
        } else {
            let tempComponent = [];
            for (let i = 0; i < multiplier; i++) {
                tempComponent.push(<Placeholder key={i}/>);
            }
            dispatch({type: "PLACEHOLDER", component: tempComponent});
        }
        return () => {
            if (delayedTimeout) {
                clearTimeout(delayedTimeout);
            }
        };
    }, [checkOnce, delay, isChecked, multiplier, condition, children]);

    return (
        <>
            {component.map((component, index) => (
                <Fragment key={index}>{component}</Fragment>
            ))}
        </>
    );

};

export default LetSuspense;
