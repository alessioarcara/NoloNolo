import classes from "./Dots.module.css";

const Dots = (props) => {
    return(
        <>
            {props.photos.map((_, idx) => (
                <div
                    key={idx}
                    className={props.onCurrentIndex === idx ? `${classes.slideshowDot} ${classes.active}` : `${classes.slideshowDot} ${classes['no-active']}`}
                />
            ))}
        </>
    );
};

export default Dots;