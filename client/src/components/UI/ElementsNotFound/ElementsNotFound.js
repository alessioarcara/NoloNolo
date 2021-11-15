import classes from './ElementsNotFound.module.css';
import {Link} from "react-router-dom";

const ElementsNotFound = ({warningText, warningTextButton, path}) => {
    return (
        <div className={classes['not-found-container']}>
            <div className={classes['container']}>
                <div className={classes['not-found-text']}>
                    {warningText}
                </div>
                <Link
                    className='btn btn-primary'
                    to={path}
                >
                    {warningTextButton}
                </Link>
            </div>
        </div>
    );
}

export default ElementsNotFound