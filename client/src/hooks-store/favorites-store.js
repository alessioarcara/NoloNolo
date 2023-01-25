import {initStore} from "./store";

const configureStore = fetchedFavorites => {
    const actions = {
        TOGGLE_FAV: (curState, favoriteAdv) => {
            const advIsFavorite = curState.userFavorites.some(userFavAdv => userFavAdv._id === favoriteAdv._id)
            if (advIsFavorite) {
                return {userFavorites: curState.userFavorites.filter(userFavAdv => userFavAdv._id !== favoriteAdv._id)}
            }
            return {userFavorites: curState.userFavorites.concat(favoriteAdv)};
        }
    }
    initStore(actions, {
        userFavorites: fetchedFavorites || []
    })
}

export default configureStore;
