import Button from "../UI/Button/Button";
import classes from "./Profile.module.css"

const Profile = ({children, logout}) => {
    return (
        <div>
            <h1 className="title">Profilo</h1>
            <section className={classes.centered}>
                <div className={classes["profile-options"]}>
                    {children}
                </div>
                <div className={classes.action}>
                    <Button onClick={logout} type="button">Esci</Button>
                </div>
            </section>
        </div>
    )
}

export default Profile;
