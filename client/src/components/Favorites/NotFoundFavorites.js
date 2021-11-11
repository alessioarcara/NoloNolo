import classes from './NotFoundFavorites.module.css';
import NotFoundIcon from "../UI/icons/NotFoundIcon";

const NotFoundFavorites = () => {
    return (
        <div className={classes['not-found-container']}>
            {/*<NotFoundIcon/>*/}
            <p className={classes['not-found-text']}>Non hai aggiunto nessun preferito!</p>
        </div>
    );
}

export default NotFoundFavorites