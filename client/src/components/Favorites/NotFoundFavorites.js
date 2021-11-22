import classes from './NotFoundFavorites.module.css';
import {Link} from "react-router-dom";

const NotFoundFavorites = () => {
    return (
        <div className={classes['not-found-container']}>
            <div className={classes['container']}>
                <div className={classes['not-found-text']}>
                    Non hai ancora nessuna barca preferita! Premi sul &hearts; per aggiungerle tra i preferiti.
                </div>
                <Link
                    className='btn btn-primary'
                    to='/'
                    state={{isOpenModal: true}}
                >
                    Cerca
                </Link>
            </div>
        </div>
    );
}

export default NotFoundFavorites
