import React, {useCallback, useState} from 'react';
import classes from "./Images.module.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Images = ({images, imageLoadedHandler}) => {

    return (
        <div className={classes.slide}>
            <img
                onLoad={imageLoadedHandler}
                src={images}
                alt={''}
                className={classes['card-image']}
            />
        </div>
    );
};

export default Images;
