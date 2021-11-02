import {SEND_CHILDREN, SEND_PLACEHOLDER} from "../helpers/constants";

export const initialState = { component: [] }

const letSuspenseReducer = (state, {type, payload}) => {
    if (type === SEND_CHILDREN)
        return { component: payload }
    if (type === SEND_PLACEHOLDER)
        return { component: payload }

    return initialState
}

export default letSuspenseReducer;