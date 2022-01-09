import React from "react";
import classes from "./ShipownerInfo.module.css";
import ReadMoreText from "../../../UI/ReadMoreText/ReadMoreText";
import {DEFAULT_AVATAR} from "../../../../helpers/Utils/constants";
import {getImagePath} from "../../../../helpers/Utils/utils";

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
                        src={shipownerAvatar ? getImagePath(shipownerAvatar) : DEFAULT_AVATAR}
                        onError={event => event.target.src = DEFAULT_AVATAR}
                        alt="foto profilo"
                    />
                </div>
            </div>
            {/* Component to show more text */}
            <ReadMoreText
                text={shipownerPresentation}
            />
            <hr/>
        </>
    );
}

export default React.memo(ShipownerInfo);
