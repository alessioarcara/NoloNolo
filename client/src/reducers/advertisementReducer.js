import {
    CHANGE_END_DATE,
    CHANGE_START_DATE,
    CLEAR_DATES,
    CLEAR_RENTAL,
    SHOW_BILL,
    SHOW_VISIBLE_CONTENT
} from "../helpers/constants";

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
        case SHOW_BILL:
            return {
                ...state,
                isBillShow: !state.isBillShow
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
                isBillShow: false
            }
        default:
            return {
                visibleContent: false,
                isBillShow: false,
                startDate: null,
                endDate: null,
            }
    }
}