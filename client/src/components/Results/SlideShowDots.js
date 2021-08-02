import classes from "./SlideShowDots.module.css";

const SlideShowDots = (props) => {
    return(
        <>
            {props.images.map((_, idx) => (
                <div
                    key={idx}
                    className={props.onCurrentIndex === idx ? `${classes.slideshowDot} ${classes.active}` : `${classes.slideshowDot} ${classes['no-active']}`}
                />
            ))}
        </>
    );
};

export default SlideShowDots;
