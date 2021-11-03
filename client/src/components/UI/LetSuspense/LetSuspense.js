import React, {Fragment, useEffect, useReducer} from "react";
import {SEND_CHILDREN, SEND_PLACEHOLDER} from "../../../helpers/constants";
import letSuspenseReducer from "../../../reducers/letSuspenseReducer";
import {initialState} from "../../../reducers/letSuspenseReducer";

const LetSuspense = ({
                         condition,
                         placeholder: Placeholder,
                         multiplier = 1,
                         delay = 2000,
                         children }) => {
    const [{isChecked, component} , dispatch] = useReducer(letSuspenseReducer, initialState)

    useEffect(() => {
        if (isChecked) {
            dispatch({type: SEND_CHILDREN, payload: [children]})
            return;
        }

        /* create delayedTimeout for setTimeout */
        let delayedTimeout = null

        /* send children with dispatch else send placeholder (from 0 to multiplier - 1) */
        if (condition) {
            if (delay) {
                delayedTimeout = setTimeout(() => {
                    dispatch({type: SEND_CHILDREN, payload: [children]})
                }, delay)
            }
        } else {
            let tempComponent = []
            for (let i = 0; i < multiplier; i++) {
                tempComponent.push(<Placeholder key={i}/>)
            }
            dispatch({type: SEND_PLACEHOLDER, payload: tempComponent})
        }

        /* Cleanup function to reset timeout */
        return () => {
            if (delayedTimeout) {
                clearTimeout(delayedTimeout)
            }
        };
    }, [delay, isChecked, multiplier, condition, children])

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
