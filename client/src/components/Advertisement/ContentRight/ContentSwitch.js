import classes from './ContentSwitch.module.css'

const ContentSwitch = ({setVisibleContent}) => {
    const switchImageClickHandler = () => {
        setVisibleContent(true);
    }

    const switchMapClickHandler = () => {
        setVisibleContent(false);
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