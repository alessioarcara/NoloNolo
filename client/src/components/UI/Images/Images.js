import React from 'react';
import classes from "./Images.module.css";
import {getImagePath} from "../../../helpers/Utils/utils";
import {DEFAULT_BOAT_IMAGE} from "../../../helpers/Utils/constants";

const Images = ({images, imageLoadedHandler}) => {
    return (
        <div className={classes.slide}>
            <img
                onLoad={imageLoadedHandler}
                src={getImagePath(images)}
                onError={event => event.target.src = DEFAULT_BOAT_IMAGE}
                alt={''}
                className={classes['card-image']}
            />
        </div>
    );
};

export default React.memo(Images);
