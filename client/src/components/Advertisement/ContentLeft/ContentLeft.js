import Header from "../Header";
import SlideShow from "../../UI/SlideShow/SlideShow";
import classes from './ContentLeft.module.css'

const ContentLeft = ({isVisible, images}) => {

    return (
        <>
            <Header/>
            <div className={classes.container}>
                {!isVisible && <p>Ciao</p>}
                {isVisible && <SlideShow images={images}/>}
            </div>

            <div className={classes['container-desktop']}>
                <p>MAPPA DESKTOP</p>
            </div>
        </>
    );
}

export default ContentLeft;