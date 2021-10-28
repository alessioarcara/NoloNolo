import classes from './SlideShow.module.css';
import './SlideShow.module.css';
import {useState} from "react";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import RightArrowIcon from "../icons/RightArrowIcon";
import Images from "../Images/Images";
import SlideShowDots from "./SlideShowDots";
import {circularSlice} from "../../../helpers/utils";

const SlideShow = ({images, children}) => {
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

    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(images.length - 1)

    const leftClickHandler = () => {
        setStart (prevIndex => prevIndex === 0 ? images.length - 1 : prevIndex - 1)
        setEnd (prevIndex => prevIndex === 0 ? images.length - 1 : prevIndex - 1)
    }

    const rightClickHandler = () => {
        setStart(prevState => prevState === images.length - 1 ? 0 : prevState + 1)
        setEnd(prevState => prevState === images.length - 1 ? 0 : prevState + 1)
    }

    return (
        <div className={classes.slideshow}>
            <div className={classes.slideshowSlider}>
                {circularSlice(images, start, end).map((place, index) => (
                    <Images
                        key={index}
                        images={place}
                    />
                ))}
            </div>
            <div className={classes.slideshowDots}>
                <SlideShowDots
                    images={images}
                    onCurrentIndex={start}
                />
            </div>
            {children}
            <div onClick={leftClickHandler} className={`${classes['style-arrow']} ${classes['show-left']}`}>
                <LeftArrowIcon/>
            </div>
            <div onClick={rightClickHandler} className={`${classes['style-arrow']} ${classes['show-right']}`}>
                <RightArrowIcon/>
            </div>
        </div>
    );
};

export default SlideShow;
