import {
    CHANGE_END_DATE,
    CHANGE_START_DATE,
    CLEAR_DATES,
    CLEAR_RENTAL,
    SHOW_CONFIRM,
    SHOW_VISIBLE_CONTENT
} from "../helpers/Utils/constants";

export const advertisementReducer = (state, {type, payload}) => {
    switch (type) {
        case CHANGE_START_DATE:
            return {
                ...state,
                startDate: payload
            }
        case CHANGE_END_DATE:
            return {
                ...state,
                endDate: payload
            }
        case CLEAR_DATES:
            return {
                ...state,
                startDate: null,
                endDate: null
            }
        case SHOW_CONFIRM:
            return {
                ...state,
                isConfirming: !state.isConfirming
            }
        case SHOW_VISIBLE_CONTENT:
            return {
                ...state,
                visibleContent: payload
            }
        case CLEAR_RENTAL:
            return {
                ...state,
                startDate: null,
                endDate: null,
                isConfirming: false
            }
        default:
            return {
                visibleContent: false,
                isConfirming: false,
                startDate: null,
                endDate: null,
            }
    }
}
