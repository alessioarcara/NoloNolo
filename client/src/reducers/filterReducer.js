import {
    ADD_GUEST, CLEAR_FORM,
    INITIAL_PRICE,
    MANAGE_BOATS,
    MANAGE_MAX_PRICE,
    MANAGE_MIN_PRICE,
    REMOVE_GUEST
} from "../helpers/Utils/constants";

export const initialState = {
    boatTypes: ['motorboat', 'sailboat', 'catamaran', 'dinghy'],
    minCapacity: 0,
    minPrice: 0,
    maxPrice: 10000
}

export const filterReducer = (state, {type, payload}) => {
    /*
    * Con some verifichiamo se l'elemento è presente, se si prendiamo il payload (oggetto boat)
    * e lo inseriamo nell'array della tipologia delle barche, altrimenti con filter eliminiamo
    * l'oggetto barca inserito precedentemente
    */
    switch (type) {
        case MANAGE_BOATS:
            return {
                ...state,
                boatTypes: (!state.boatTypes.some(el => el === payload))
                    ? [...state.boatTypes, payload]
                    : [...state.boatTypes.filter(el => el !== payload)]
            }
        case ADD_GUEST:
            return {
                ...state,
                minCapacity: state.minCapacity + 1 > 50
                    ? state.minCapacity
                    : state.minCapacity + 1
            }
        case REMOVE_GUEST:
            return {
                ...state,
                minCapacity: state.minCapacity - 1 < 0
                    ? state.minCapacity
                    : state.minCapacity - 1
            }
        case INITIAL_PRICE:
            return {
                ...state,
                minPrice: payload.min,
                maxPrice: payload.max
            }
        case MANAGE_MIN_PRICE:
            return {
                ...state,
                minPrice: payload
            }
        case MANAGE_MAX_PRICE:
            return {
                ...state,
                maxPrice: payload
            }
        case CLEAR_FORM:
            return {
                boatTypes: ['motorboat', 'sailboat', 'catamaran', 'dinghy'],
                minCapacity: 0,
                minPrice: 0,
                maxPrice: payload
            }
        default:
            return initialState
    }
}

export default filterReducer;
