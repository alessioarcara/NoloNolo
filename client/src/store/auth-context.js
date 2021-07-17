import React, {useEffect, useState} from "react";
import {body_refresh, invalidate} from "../helpers/query"
import useHttp from "../hooks/use-http";

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

    const loginHandler = (token) => {
        setToken(token)
    }

    const logoutHandler = () => {
        sendRequest({body: invalidate, token})
        setToken(null)
    };

    useEffect(() => {
        if (!token) {
            const transformData = resData => {
                const authData = resData.refreshToken
                setToken(authData["token"])
            }
            sendRequest({body: body_refresh}, transformData)
        }
    }, [token, sendRequest]);

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
