import React, {useContext, useEffect, useState} from "react";
import Button from "../UI/Button/Button";
import classes from "./AuthForm.module.css"
import useForm from "../../hooks/use-form";
import useHttp from "../../hooks/use-http";

import {body_login, body_signup} from '../../helpers/httpConfig'
import {authForm} from "../../helpers/formConfig";
import AuthContext from "../../store/auth-context";
import Modal from "../UI/Modal/Modal";


const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true)
    const {error, status, data: payload, sendRequest: authenticate} = useHttp()
    const {formValues, renderFormInputs, isFormValid, resetForm} = useForm(authForm)

    const authCtx = useContext(AuthContext)

    const switchAuthModeHandler = () => {
        setIsLogin(prevState => !prevState);
    };

    const submitHandler = event => {
        event.preventDefault();

        const enteredEmail = formValues[0]
        const enteredPassword = formValues[1]

        const transformData = resData => resData[Object.keys(resData)]

        if (isLogin) {
            authenticate({body: body_login(enteredEmail, enteredPassword)}, transformData)
        } else {
            authenticate({body: body_signup({enteredEmail, enteredPassword})}, transformData)
        }
        resetForm()
    }

    useEffect(() => {
        if (payload && payload["authData"])
            authCtx.login(payload.authData.token)
    }, [authCtx, payload])

    return (
        <>
            {status === 'completed' && payload && payload.authProblem && <Modal title="Error">{payload.authProblem}</Modal>}
            {status === 'completed' && error && <Modal title="Error">{error}</Modal>}
            <section className={classes.auth}>
                <h1>{isLogin ? "Accedi" : "Registrati"}</h1>
                <form onSubmit={submitHandler}>
                    {renderFormInputs()}
                    <div className={classes.actions}>
                        <Button isLoading={status === "pending"} disabled={!isFormValid()}>Continua</Button>
                        <Button
                            type="button"
                            className={classes.toggle}
                            onClick={switchAuthModeHandler}>
                            {isLogin ? "Crea nuovo account" : "Entra con un account esistente"}
                        </Button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default React.memo(AuthForm);
