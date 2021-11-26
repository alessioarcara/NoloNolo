import classes from './ContentSwitch.module.css'
import {useCallback} from "react";
import {SHOW_VISIBLE_CONTENT} from "../../../helpers/Utils/constants";

const ContentSwitch = ({dispatch}) => {
    const scrollTopPage = useCallback(() => {
        window.scrollTo(0, 0)
    }, [])

    const switchImageClickHandler = () => {
        dispatch({type: SHOW_VISIBLE_CONTENT, payload: true})
        scrollTopPage()
    }

    const switchMapClickHandler = () => {
        dispatch({type: SHOW_VISIBLE_CONTENT, payload: false})
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
