import classes from './NotFoundFavorites.module.css';
import {Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../store/auth-context";

const NotFoundFavorites = () => {
    const {isLoggedIn} = useContext(AuthContext)

    return (
        <div className={classes['not-found-container']}>
            <div className={classes['container']}>
                <div className={classes['not-found-text']}>
                    Non hai ancora nessuna barca preferita! Premi sul &hearts; per aggiungerle tra i preferiti.
                </div>
                <Link
                    className='btn btn-primary'
                    to={isLoggedIn ? '/' : 'auth'}
                >
                    {isLoggedIn ? 'Cerca' : 'Login'}
                </Link>
            </div>
        </div>
    );
}

export default NotFoundFavorites