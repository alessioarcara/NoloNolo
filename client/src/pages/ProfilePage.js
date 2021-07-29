import React, {useContext, useEffect} from "react";
import AuthContext from "../store/auth-context";
import useHttp from "../hooks/use-http";
import ProfileOption from "../components/Profile/ProfileOption";
import Button from "../components/UI/Button/Button";
import classes from "./ProfilePage.module.css"
import LoadingSpinner from "../components/UI/LoadingSpinner/LoadingSpinner";

const bodyRequest = {
    query: `
    query {
        user {
            _id
            email
        }
    }`
};

const ProfilePage = () => {

    /* PROVVISORIO */

    const authCtx = useContext(AuthContext)

    const {status, error, data: user, sendRequest: fetchUser} = useHttp(true)

    let content = <LoadingSpinner/>

    useEffect(() => {
        const transformData = resData => resData.user
        fetchUser({body: bodyRequest, token: authCtx.token}, transformData)
    }, [fetchUser, authCtx.token])

    if (status === "completed" && user) { content = user.email }
    if (status === "completed" && error) { content = <p>User not found.</p>}

    return (
        <div className="centered">
            <h1>Profilo</h1>
            <div>{content}</div>
            <div className={classes.container}>
                <ProfileOption
                    title="Informazioni personali"
                    content="Comunicaci i tuoi dati personali e le informazioni per contattarti"
                />
                <ProfileOption
                    title="Noleggi"
                    content="Visualizza i tuoi noleggi o modifica e cancella un noleggio"
                />
                <ProfileOption
                    title="3"
                    content="lorem ipsum dolor sit amet"
                />
                <ProfileOption
                    title="4"
                    content="lorem ipsum dolor sit amet"
                />
                <ProfileOption
                    title="5"
                    content="lorem ipsum dolor sit amet"
                />
                <ProfileOption
                    title="6"
                    content="lorem ipsum dolor sit amet"
                />
                <div className={classes.action}>
                    <Button onClick={authCtx.logout} type="button">Logout</Button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
