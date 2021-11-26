import {CHANGE_END_DATE, CHANGE_START_DATE, CLEAR_DATES, SWITCH_SEARCH} from "../helpers/Utils/constants";

export const initialState = {
    startDate: null,
    endDate: null,
    city: "",
    region: "",
    isNextPage: false
}

export const searchReducer = (state, {type, payload}) => {
    switch (type) {
        case SWITCH_SEARCH:
            return {
                ...state,
                isNextPage: !state.isNextPage,
                city: payload.city,
                region: payload.region
            }
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
        default:
            return initialState;
    }
}

export default searchReducer;
