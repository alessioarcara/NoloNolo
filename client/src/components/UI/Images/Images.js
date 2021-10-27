import React, {useCallback, useState} from 'react';
import classes from "./Images.module.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Images = ({images}) => {
    const [isLoading, setIsLoading] = useState(true)

    const handleImageLoaded = useCallback(() => setIsLoading(false), []);
    return (
        <div className={classes.slide}>
            {isLoading && <LoadingSpinner/>}
            <img
                onLoad={handleImageLoaded}
                src={images}
                alt={''}
                className={classes['card-image']}
            />
        </div>
    );
};

export default Images;
