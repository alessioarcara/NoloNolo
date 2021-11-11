import classes from './UserDetailsHeader.module.css';
import BackIcon from "../../UI/icons/BackIcon";

const UserDetailsHeader = () => {


    return (
        <div className={classes.header}>
            <div className={classes['user-header-container']}>
                <BackIcon/>
                <div className={classes['header-text']}>Informazioni</div>
            </div>
        </div>
    );
}

export default UserDetailsHeader