import classes from './SlideShow.module.css';
import './SlideShow.module.css';
import {useState} from "react";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import RightArrowIcon from "../icons/RightArrowIcon";
import Images from "../Images/Images";
import SlideShowDots from "./SlideShowDots";
import {circularSlice} from "../../../helpers/Utils/utils";
import {DEFAULT_BOAT_IMAGE} from "../../../helpers/Utils/constants";

const SlideShow = ({images, children, classNameSlideShowSlider}) => {
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(images.length - 1)

    const leftClickHandler = () => {
        setStart(prevIndex => prevIndex === 0 ? images.length - 1 : prevIndex - 1)
        setEnd(prevIndex => prevIndex === 0 ? images.length - 1 : prevIndex - 1)
    }

    const rightClickHandler = () => {
        setStart(prevState => prevState === images.length - 1 ? 0 : prevState + 1)
        setEnd(prevState => prevState === images.length - 1 ? 0 : prevState + 1)
    }

    return (
        <div className={classes.slideshow}>
            <div className={`${classes.slideshowSlider} ${classNameSlideShowSlider ? classNameSlideShowSlider : ''}`}>
                {images.length > 0 ?
                circularSlice(images, start, end).map((place, index) => (
                    <Images
                        key={index}
                        images={place}
                    />
                )) : <Images images={DEFAULT_BOAT_IMAGE}/>
                }
            </div>
            {images.length > 1 && <>
                <div className={classes.slideshowDots}>
                    <SlideShowDots
                        images={images}
                        onCurrentIndex={start}
                    />
                </div>
                <div onClick={leftClickHandler} className={`${classes['style-arrow']} ${classes['show-left']}`}>
                    <LeftArrowIcon/>
                </div>
                <div onClick={rightClickHandler} className={`${classes['style-arrow']} ${classes['show-right']}`}>
                    <RightArrowIcon/>
                </div>
            </>
            }
            {children}
        </div>
    );
};

export default SlideShow;
