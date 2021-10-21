import {useState, useEffect} from "react";

// we share globalState between all components that import this file.
let globalState = {};
// array full of setState which i call to update all components that are using my hook
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
    // we need this for render our components when something in our state changes.
    const setState = useState(globalState)[1]

    // (use identifier of action to reach action)
    // like reducer function we check action and return a state, like reducer
    const dispatch = (actionIdentifier, payload) => {
        const newState = actions[actionIdentifier](globalState, payload)
        // global state is an object with old data, plus new data
        globalState = {...globalState, ...newState}

        // inform all listeners about state update using useState
        for (const listener of listeners) {
            listener(globalState)
        }
    }

    useEffect(() => {
        // every component that uses my hook, will get its own setState, which is added
        // to shared listeners array
        if (shouldListen) {
            listeners.push(setState);
        }

        // remove the listener when the component unmount
        return () => {
            if (shouldListen) {
                listeners = listeners.filter(li => li !== setState)
            }
        }
    }, [setState, shouldListen])

    return [globalState, dispatch]
};

export const initStore = (userActions, initialState) => {
    if (initialState) {
        globalState = {...globalState, ...initialState}
    }
    actions = {...actions, ...userActions}
}
