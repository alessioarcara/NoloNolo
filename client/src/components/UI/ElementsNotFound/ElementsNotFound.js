import React from "react";
import classes from './ElementsNotFound.module.css';
import {Link} from "react-router-dom";

const ElementsNotFound = ({warningText, warningTextButton, path, hasBackdrop = true}) => {
    return (
        <div className={`${classes['not-found-container']} ${hasBackdrop ? classes['box-shadow'] : ''}`}>
            <div className={classes['container']}>
                <div className={classes['not-found-text']}>
                    {warningText}
                </div>
                {path &&
                <Link
                    className='btn btn-primary'
                    to={path}
                    state={{isOpenModal: true}}
                >
                    {warningTextButton}
                </Link>
                }
            </div>
        </div>
    );
}

export default React.memo(ElementsNotFound)
