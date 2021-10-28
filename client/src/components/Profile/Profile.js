import Button from "../UI/Button/Button";
import classes from "./Profile.module.css"

const Profile = ({children, auth}) => {

    return (
        <>
            <div className={`centered ${classes.background_black}`}>
                <h1 className={`title ${classes.title}`}>Profilo</h1>
                <div className={classes.container}>
                    {children}
                </div>
                <div className={classes.action}>
                    <Button onClick={auth.logout} type="button">Logout</Button>
                </div>
            </div>
        </>
    )
}

export default Profile;