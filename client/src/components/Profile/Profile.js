import Button from "../UI/Button/Button";
import classes from "./Profile.module.css"

const Profile = ({children, auth}) => {
    return (
        <>
            <h1 className="title">Profilo</h1>
            <section className="centered">
                <div className={classes.container}>
                    {children}
                </div>
                <div className={classes.action}>
                    <Button className={classes.logout} onClick={auth.logout} type="button">Esci</Button>
                </div>
            </section>
        </>
    )
}

export default Profile;
