import React, {useCallback, useState} from 'react';
import classes from "./Images.module.css";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

const Images = (props) => {
    const [isLoading, setIsLoading] = useState(true)

    const handleImageLoaded = useCallback(() => setIsLoading(false), []);
    return (
        <>
            {props.photos.map((image, index) =>
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
