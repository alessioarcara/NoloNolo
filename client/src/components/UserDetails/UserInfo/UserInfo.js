import classes from './UserInfo.module.css';
import Avatar from "./Avatar/Avatar";

const UserInfo = ({status, user, sendFile}) => {
    return (
        <div className={classes['info-container']}>
            <div className={classes['presentation-container']}>
                <div className={classes['text-name']}>Ciao, io sono {user ? user.email.split('@')[0] : 'utente'}</div>
                <div className={classes['from']}>Su NoloNolo dal {user ? new Date(user.createdAt).getFullYear() : '????'}</div>
            </div>
            <Avatar
                status={status}
                user={user}
                sendFile={sendFile}
            />
        </div>
    );
}

export default UserInfo
