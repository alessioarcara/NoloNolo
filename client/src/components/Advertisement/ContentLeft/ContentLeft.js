import Header from "../Header";
import SlideShow from "../../UI/SlideShow/SlideShow";
import classes from './ContentLeft.module.css'

const ContentLeft = ({isVisible, images}) => {

    return (
        <>
            <Header/>
            <div className={classes['container-mobile']}>
                {!isVisible && <p>MAPPA MOBILE</p>}
                {isVisible && <SlideShow classNameSlideShowSlider={classes['custom-images']} images={images}/>}
            </div>

            <div className={classes['container-desktop']}>
                <p>MAPPA DESKTOP</p>
            </div>
        </>
    );
}

export default ContentLeft;