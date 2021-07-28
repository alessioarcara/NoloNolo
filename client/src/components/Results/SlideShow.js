import classes from './SlideShow.module.css';
import HeartIcon from "../UI/icons/MenuIcons/HeartIcon";
import './SlideShow.module.css';
import {useState} from "react";
import LeftArrowIcon from "../UI/icons/LeftArrowIcon";
import RightArrowIcon from "../UI/icons/RightArrowIcon";
import Images from "./Images";
import Dots from "./Dots";

const SlideShow = (props) => {
    const [isClicked, setIsClicked] = useState(false);
    const [index, setIndex] = useState(0);
    const images = props.image;

    const changeClickHandler = () => {
        setIsClicked(state => !state);
    }

    const leftClickHandler = () => {
        index === 0
            ? setIndex(images.length - 1)
            : setIndex(index - 1)
    }

    const rightClickHandler = () => {
        index === images.length - 1
            ? setIndex(0)
            : setIndex(index + 1)
    }

    return (
        <>
            <div className={classes.slideshow}>
                <div className={classes.slideshowSlider} style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                    <Images
                        photos={images}
                    />
                </div>

                <div className={classes.slideshowDots}>
                    <Dots
                        photos={images}
                        onCurrentIndex={index}
                    />
                </div>

                <div onClick={changeClickHandler}
                     className={isClicked ? `${classes.icon} ${classes.clicked}` : classes.icon}>
                    <HeartIcon className={classes.heart}/>
                </div>

                <div onClick={leftClickHandler} className={`${classes['style-arrow']} ${classes['show-left']}`}>
                    <LeftArrowIcon/>
                </div>

                <div onClick={rightClickHandler} className={`${classes['style-arrow']} ${classes['show-right']}`}>
                    <RightArrowIcon/>
                </div>
            </div>
        </>
    );
};

export default SlideShow;