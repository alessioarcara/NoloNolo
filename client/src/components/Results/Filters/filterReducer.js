import {
    ADD_GUEST, CLEAR_FORM,
    INITIAL_PRICE,
    MANAGE_BOATS,
    MANAGE_MAX_PRICE,
    MANAGE_MIN_PRICE,
    REMOVE_GUEST
} from "../../../helpers/constants";

export const initialState = {
    boatTypes: ['motorboat', 'sailboat', 'catamaran', 'dinghy'],
    minCapacity: 0,
    minPrice: 0,
    maxPrice: 10000
}

const filterReducer = (state, {type, payload}) => {
    /*
    * Con some verifichiamo se l'elemento è presente, se si prendiamo il payload (oggetto boat)
    * e lo inseriamo nell'array della tipologia delle barche, altrimenti con filter eliminiamo
    * l'oggetto barca inserito precedentemente
    */
    if (type === MANAGE_BOATS) {
        return {
            ...state,
            boatTypes: (!state.boatTypes.some(el => el === payload))
                ? [...state.boatTypes, payload]
                : [...state.boatTypes.filter(el => el !== payload)]
        }
    }
    if (type === ADD_GUEST) {
        return {
            ...state,
            minCapacity: state.minCapacity + 1 > 50
                ? state.minCapacity
                : state.minCapacity + 1
        }
    }
    if (type === REMOVE_GUEST) {
        return {
            ...state,
            minCapacity: state.minCapacity - 1 < 0
                ? state.minCapacity
                : state.minCapacity - 1
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
    if (type === CLEAR_FORM) {
        return {
            boatTypes: ['motorboat', 'sailboat', 'catamaran', 'dinghy'],
            minCapacity: 0,
            minPrice: 0,
            maxPrice: payload
        }
    }

    return initialState
}

export default filterReducer;
