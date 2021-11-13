import Button from "../UI/Button/Button";
import classes from "./Profile.module.css"

const Profile = ({children, auth}) => {
    return (
        <>
            <div className='centered'>
                <h1 className={`title ${classes.title}`}>Profilo</h1>
                <div className={classes.container}>
                    {children}
                </div>
                <div className={classes.action}>
                    <Button className={classes.logout} onClick={auth.logout} type="button">Esci</Button>
                </div>
            </div>
        </>
    )
}

export default Profile;
