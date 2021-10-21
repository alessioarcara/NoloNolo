import {
    ADD_GUEST, CLEAR_FORM,
    INITIAL_PRICE,
    MANAGE_BOATS,
    MANAGE_MAX_PRICE,
    MANAGE_MIN_PRICE,
    REMOVE_GUEST
} from "../../../helpers/constants";
import { initialState } from "./Filter";

const filterReducer = (state, {type, payload}) => {
    /*
    * Con some verifichiamo se l'elemento è presente, se si prendiamo il payload (oggetto boat)
    * e lo inseriamo nell'array della tipologia delle barche, altrimenti con filter eliminiamo
    * l'oggetto barca inserito precedentemente
    */
    if (type === MANAGE_BOATS) {
        return {
            ...state,
            boatsTypes: (!state.boatsTypes.some(el => el === payload))
                ? [...state.boatsTypes, payload]
                : [...state.boatsTypes.filter(el => el !== payload)]
        }
    }
    if (type === ADD_GUEST) {
        return {
            ...state,
            guests: state.guests + 1 > 5
                ? state.guests
                : state.guests + 1
        }
    }
    if (type === REMOVE_GUEST) {
        return {
            ...state,
            guests: state.guests - 1 < 0
                ? state.guests
                : state.guests - 1
        }
    }
    if (type === INITIAL_PRICE) {
        return {
            ...state,
            minPrice: payload.min,
            maxPrice: payload.max
        }
    }
    if (type === MANAGE_MIN_PRICE) {
        return {
            ...state,
            minPrice: payload
        }
    }
    if (type === MANAGE_MAX_PRICE) {
        return {
            ...state,
            maxPrice: payload
        }
    }

    return initialState
}

export default filterReducer;