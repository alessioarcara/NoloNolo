import Button from "../UI/Button/Button";
import classes from "./Profile.module.css"
import Header from "../UI/Header/Header";

const Profile = ({children, logout}) => {
    return (
        <>
            <Header textTitle="Profilo"/>
            <section className={classes["profile-container"]}>
                <div className={classes["profile-options"]}>
                    {children}
                </div>
                <div className={classes.action}>
                    <Button onClick={logout} type="button">Esci</Button>
                </div>
            </section>
        </>
    )
}

export default Profile;
