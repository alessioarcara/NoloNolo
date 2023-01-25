import React, {useCallback, useEffect, useState} from "react";
import {body_favorites, body_refresh, invalidate} from "../helpers/httpConfig"
import useHttp from "../hooks/use-http";
import favoritesConfigureStore from "../hooks-store/favorites-store";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});

export const AuthContextProvider = props => {

    const [token, setToken] = useState('')
    const {sendRequest} = useHttp()

    const userIsLoggedIn = !!token;

    const getUserFavoritesHandler = useCallback((token) => {
        sendRequest({body: body_favorites, token}, resData => {
            favoritesConfigureStore(resData.favorites.map(
                favorite => { return {...favorite, advIsFavorite: true} }
            ))
        })
    }, [sendRequest])

    const loginHandler = useCallback((token) => {
        setToken(token)
        getUserFavoritesHandler(token)
    }, [getUserFavoritesHandler])

    const logoutHandler = useCallback(() => {
        setToken(null)
        sendRequest({body: invalidate, token}, () => favoritesConfigureStore())
    }, [sendRequest, token]);

    useEffect(() => {
        const transformData = resData => {
            const authData = resData.refreshToken
            setToken(authData["token"])
            getUserFavoritesHandler(authData["token"])
        }

        sendRequest({body: body_refresh}, transformData)
    }, [sendRequest, getUserFavoritesHandler]);

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;
