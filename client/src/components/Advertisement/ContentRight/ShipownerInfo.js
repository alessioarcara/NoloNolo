import {useState} from 'react';
import classes from "./ShipownerInfo.module.css";

const ShipownerInfo = ({shipownerEmail, shipownerAvatar, shipownerPresentation}) => {
    const [isReadMore, setIsReadMore] = useState(false)
    const toggleReadMore = () => {
        setIsReadMore(prevState => !prevState)
    }

    return (
        <>
            <div className={classes[`shipowner`]}>
                <div>
                    Armatore: <span className={classes[`shipowner-name`]}>{shipownerEmail}</span>
                </div>
                <div className={classes[`shipowner-avatar`]}>
                    <img
                        // src={'https://miro.medium.com/max/810/0*TIeve9KmJ-Ex8ssc'}
                        src={shipownerAvatar}
                        alt={''}
                    />
                </div>
            </div>
            <div className={classes[`shipowner-presentation`]}>
                {isReadMore ? `${shipownerPresentation} rferrefre fregrerre fehfwe fhwefhewohew fheiwfohewoifhioew fhewiofhwe ifweio fewhifoweh fwoihf iwhfio ` : shipownerPresentation.slice(0, 25)}
            </div>
            <div className={classes[`show-more-content`]} onClick={toggleReadMore}>
                {!isReadMore ? `Mostra altro` : `Mostra meno`}
            </div>
            <hr/>
        </>
    );
}

export default ShipownerInfo;