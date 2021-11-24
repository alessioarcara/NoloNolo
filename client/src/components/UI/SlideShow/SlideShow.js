import classes from './SlideShow.module.css';
import './SlideShow.module.css';
import {useCallback, useState} from "react";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import RightArrowIcon from "../icons/RightArrowIcon";
import Images from "../Images/Images";
import SlideShowDots from "./SlideShowDots";
import {circularSlice} from "../../../helpers/utils";

const SlideShow = ({images, children, classNameSlideShowSlider}) => {
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(images.length - 1)

    const [isLoading, setIsLoading] = useState(true)
    const imageLoadedHandler = useCallback(() => setIsLoading(false), [])

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
                {isLoading && <img style={{objectFit: 'cover', width: '100%', height: '100%'}} src="https://www.trroofingsheets.co.uk/wp-content/uploads/2016/05/default-no-image-1.png" alt=""/>}
                {circularSlice(images, start, end).map((place, index) => (
                    <Images
                        key={index}
                        images={place}
                        imageLoadedHandler={imageLoadedHandler}
                    />
                ))}
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
