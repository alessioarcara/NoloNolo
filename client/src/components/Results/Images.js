import React, {useCallback, useState} from 'react';
import classes from "./Images.module.css";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

const Images = ({images}) => {
    const [isLoading, setIsLoading] = useState(true)

    const handleImageLoaded = useCallback(() => setIsLoading(false), []);
    return (
        <>
            {images.map((image, index) =>
                <div key={index} className={classes.slide}>
                    {isLoading && <LoadingSpinner/>}
                    <img
                        onLoad={handleImageLoaded}
                        src={image}
                        alt={''}
                        className={classes['card-image']}
                    />
                </div>
            )}
        </>
    );
};

export default Images;
