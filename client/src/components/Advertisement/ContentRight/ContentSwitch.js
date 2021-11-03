import classes from './ContentSwitch.module.css'
import {useCallback} from "react";

const ContentSwitch = ({setVisibleContent}) => {
    const scrollTopPage = useCallback(() => {
        window.scrollTo(0, 0)
    }, [])

    const switchImageClickHandler = () => {
        setVisibleContent(true);
        scrollTopPage()
    }

    const switchMapClickHandler = () => {
        setVisibleContent(false);
        scrollTopPage()
    }

    return (
        <div className={classes.container}>
            <div className={classes.map} onClick={switchMapClickHandler}>Mappa</div>
            <div className={classes.bar}/>
            <div className={classes.img} onClick={switchImageClickHandler}>Immagini</div>
        </div>
    );
}

export default ContentSwitch;