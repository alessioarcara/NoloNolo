import classes from "./ShipownerInfo.module.css";
import ReadMoreText from "../../../UI/ReadMoreText/ReadMoreText";

const ShipownerInfo = ({shipownerEmail, shipownerAvatar, shipownerPresentation}) => {
    return (
        <>
            {/* Container of name, harbour and shipowner avatar */}
            <div className={classes[`shipowner`]}>
                <div className={classes['container-info']}>
                    <div className={classes['shipowner-name']}>Armatore: <span className={classes[`info`]}>{shipownerEmail}</span></div>
                </div>
                <div className={classes[`shipowner-avatar`]}>
                    <img
                        // src={'https://media-assets.vanityfair.it/photos/614ca309da3ab1f8a363d56a/1:1/w_874,h_874,c_limit/donna-P.jpg'}
                        src={shipownerAvatar}
                        alt={''}
                    />
                </div>
            </div>
            {/* Component to show more text */}
            <ReadMoreText
                text='Ciao a tutti, sono davvero ahahaha sisisi, allora se prendiamo quindi questo sisi sempre
                così. Ma va bene secondo me perchè sennò sei davvero bravo ma tanto si può fare lo stesso'
                // text={shipownerPresentation}
            />
            <hr/>
        </>
    );
}

export default ShipownerInfo;
