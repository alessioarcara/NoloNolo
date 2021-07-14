import React, {useState} from "react";

const AuthContext = React.createContext({
   token: '',
   isLoggedIn: false,
   login: (token) => {},
   logout: () => {}
});

export const AuthContextProvider = props => {

    const [token, setToken] = useState()

    const userIsLoggedIn = !!token;

    const logoutHandler = () => {

    };

    const loginHandler = (token, expirationTime) => {
        setToken({token, expiry: expirationTime})
    };

    const contextValue = {
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;
