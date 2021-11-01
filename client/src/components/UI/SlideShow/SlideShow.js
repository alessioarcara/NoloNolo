import classes from './SlideShow.module.css';
import './SlideShow.module.css';
import {useState} from "react";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import RightArrowIcon from "../icons/RightArrowIcon";
import Images from "../Images/Images";
import SlideShowDots from "./SlideShowDots";

const SlideShow = ({images, children}) => {
    const [index, setIndex] = useState(0);

    // const imageRef = useRef(null)
    // const [isVisible, setIsVisible] = useState(false)

    // const callbackFunction = entries => {
    //     const [entry] = entries
    //     setIsVisible(entry.isIntersecting)
    // }

    // const options = {
    //     root: null,
    //     rootMargin: "0px",
    //     threshold: 0.5
    // }
    //
    // console.log(imageRef)
    //
    // useEffect(() => {
    //     const observer = new IntersectionObserver(callbackFunction, options)
    //     if (imageRef.current) observer.observe(imageRef.current)
    //
    //     return () => { if (imageRef.current) observer.unobserve((imageRef.current)) }
    // }, [imageRef, options])

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
                <div className={classes.slideshowSlider} style={{transform: `translate3d(${-index * 100}%, 0, 0)`}}>
                    <Images
                        images={images}
                    />
                </div>
                {images.length > 1 && <>
                    <div className={classes.slideshowDots}>
                        <SlideShowDots
                            images={images}
                            onCurrentIndex={index}
                        />
                    </div>
                    <div onClick={leftClickHandler} className={`${classes['style-arrow']} ${classes['show-left']}`}>
                        <LeftArrowIcon/>
                    </div>
                    <div onClick={rightClickHandler} className={`${classes['style-arrow']} ${classes['show-right']}`}>
                        <RightArrowIcon/>
                    </div>
                </>}
                {children}
            </div>
        </>
    );
};

export default SlideShow;
