import {useContext, useRef, useState} from "react";
import {useHistory} from "react-router-dom"
import classes from "./AuthForm.module.css"
import useHttp from "../../hooks/use-http";

import {body_login, body_signup} from '../../helpers/query'
import AuthContext from "../../store/auth-context";

const transformData = (resData) => {
    const authData = resData.data[Object.keys(resData.data)]
    return authData
}

const AuthForm = () => {
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const [isLogin, setIsLogin] = useState(true)
    const {data: authData, status, error,  sendRequest: authenticate} = useHttp(true)

    const authCtx = useContext(AuthContext)
    const history = useHistory()

    const switchAuthModeHandler = () => {
        setIsLogin(prevState => !prevState);
    };

    const submitHandler = event => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        if (isLogin) {
            authenticate({body: body_login(enteredEmail, enteredPassword)}, transformData)
        } else {
            authenticate({body: body_signup({enteredEmail, enteredPassword})}, transformData)
        }
    }

    if (status === 'completed' && !error) {
        authCtx.login(authData.token, authData.tokenExpiration)
        history.replace('/')
    }

    return (
        <section className={classes.auth} onSubmit={submitHandler}>
            <h1>{isLogin ? "Accedi" : "Registrati"}</h1>
            <form>
                <div className={classes.control}>
                    <label htmlFor="email">Email</label>
                    <input type="email"
                           ref={emailInputRef}
                           id="email"/>
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Password</label>
                    <input type="password"
                           ref={passwordInputRef}
                           id="password"/>
                </div>
                <div className={classes.actions}>
                    <button>Continua</button>
                    <button
                        type="button"
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? "Crea nuovo account" : "Entra con un account esistente"}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default AuthForm;
