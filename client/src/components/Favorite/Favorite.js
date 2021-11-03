import React, {useContext} from "react";
import classes from "./Favorite.module.css"
import HeartIcon from "../UI/icons/MenuIcons/HeartIcon";
import {useStore} from "../../hooks-store/store";
import {body_addFavorite, body_removeFavorite} from "../../helpers/httpConfig";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
import Modal from "../UI/Modal/Modal";

const Favorite = ({boatId, advIsFavorite}) => {
    const {isLoggedIn, token} = useContext(AuthContext)
    const {status, error, data: payload, sendRequest: toggleFavorite} = useHttp(false)

    const dispatch = useStore(false)[1]

    const toggleFavoritesStatusHandler = () => {
        const transformData = resData => {
            const favoritesPayload = resData[Object.keys(resData)[0]]
            favoritesPayload.favoritesData &&
            dispatch('TOGGLE_FAV', {...favoritesPayload.favoritesData, advIsFavorite: true})
            return favoritesPayload
        }
        !advIsFavorite ? toggleFavorite({body: body_addFavorite({boatId}), token}, transformData) :
            toggleFavorite({body: body_removeFavorite({boatId}), token}, transformData)
    }

    return (
        <>
            {status === 'completed' && payload && payload.favoritesProblem &&
            <Modal title="Error">{payload.favoritesProblem}</Modal>}
            {status === 'completed' && error && <Modal title="Error">{error}</Modal>}
            {isLoggedIn &&
            <div onClick={toggleFavoritesStatusHandler}
                 className={advIsFavorite ? `${classes.icon} ${classes.clicked}` : classes.icon}>
            >
                <HeartIcon className={classes.heart}/>
            </div>
            }
        </>
    )
}

export default Favorite;
