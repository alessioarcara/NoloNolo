import {useState} from "react";
import classes from "./AuthForm.module.css"

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true)

    const switchAuthModeHandler = () => {
        setIsLogin(prevState => !prevState);
    };

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? "Accedi" : "Registrati"}</h1>
            <form>
                <div className={classes.control}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email"/>
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"/>
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

export default AuthForm
