import React from 'react';
import classes from "./Images.module.css";

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
