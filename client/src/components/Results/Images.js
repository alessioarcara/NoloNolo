import React from 'react';
import classes from "./Images.module.css";

const Images = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            {props.photos.map((image, index) =>
                <div key={index} className={classes.slide}>
                    <img
                        src={image}
                        alt={''}
                        className={classes['card-image']}
                    />
                </div>
            )}
        </div>
    );
});

export default Images;
