import React, {useCallback, useState} from 'react';
import classes from "./Images.module.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Images = ({images}) => {
    return (
        <div className={classes.slide}>
            <img
                src={images}
                alt={''}
                className={classes['card-image']}
            />
        </div>
    );
};

export default Images;
