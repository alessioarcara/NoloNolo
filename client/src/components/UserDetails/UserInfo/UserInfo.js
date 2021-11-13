import classes from './UserInfo.module.css';
import Button from "../../UI/Button/Button";

const UserInfo = ({user}) => {
    return (
        <div className={classes['info-container']}>
            <div className={classes['presentation-container']}>
                <div className={classes['text-name']}>Ciao, io sono {user && user.email.split('@')[0]}</div>
                <div className={classes['from']}>Su NoloNolo dal 2021</div>
            </div>
            <div className={classes['image-container']}>
                <div className={classes['image']}>
                    <img
                        className={classes.avatar}
                        src={'https://www.animeita.net/events/pippo_foto02.jpg'}
                        alt={''}
                    />
                </div>
                <Button className={`${classes['update-image']} btn btn-secondary`}>Aggiorna</Button>
            </div>
        </div>
    );
}

export default UserInfo