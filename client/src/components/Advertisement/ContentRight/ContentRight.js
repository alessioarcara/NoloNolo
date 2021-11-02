import ContentSwitch from "./ContentSwitch";
import SlideShow from "../../UI/SlideShow/SlideShow";
import classes from "../ContentRight/ContentRight.module.css";

const ContentRight = ({setVisibleContent, images}) => {

    return (
        <div style={{marginTop: '-1rem'}}>
            <ContentSwitch setVisibleContent={setVisibleContent}/>
            <div className={classes['images-container']}>
                <SlideShow classNameSlideShowSlider={classes[`custom-images`]} images={images}/>
            </div>

            <div style={{overflowY: "scroll"}}></div>

        </div>
    );
}

export default ContentRight;