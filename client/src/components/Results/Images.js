import classes from "./Images.module.css";

const Images = (props) => {
    return (
        <>
            {props.photos.map((image, index) =>
                <div key={index} className={classes.slide}>
                    <img
                        src={image}
                        className={classes['card-image']}
                    />
                </div>
            )}
        </>
    );
};

export default Images;