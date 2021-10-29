import {SEND_CHILDREN, SEND_PLACEHOLDER} from "../helpers/constants";

export const initialState = { isChecked: false, component: [] }

const letSuspenseReducer = (state, {type, payload}) => {
    if (type === SEND_CHILDREN)
        return {isChecked: true, component: payload}
    if (type === SEND_PLACEHOLDER)
        return {isChecked: false, component: payload}
    if (type === 'CLEAR') {
        return {...state, isChecked: false}
    }

    return initialState
}

export default letSuspenseReducer;