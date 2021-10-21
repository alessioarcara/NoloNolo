import {initStore} from "./store";

const configureStore = () => {
    const actions = {
        TOGGLE_FAV: (curState, favoriteAdv) => {
            const advIsFavorite = curState.userFavorites.some(userFavAdv => userFavAdv.id === favoriteAdv.id)
            if (advIsFavorite) {
                return {userFavorites: curState.userFavorites.filter(userFavAdv => userFavAdv.id !== favoriteAdv.id)}
            }
            return {userFavorites: curState.userFavorites.concat(favoriteAdv)};
        }
    }
    initStore(actions, {
        userFavorites: []
    })
}

export default configureStore;
