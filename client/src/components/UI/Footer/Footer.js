import React from "react";
import classes from "./Footer.module.css";
import PencilIcon from "../icons/PencilIcon";

const Footer = React.forwardRef((props, ref) => {
    return (
            <div className={classes.footer} ref={ref}>
                <PencilIcon/>
                <div className={classes['grid-footer']}>
                    <div>Arcara Alessio</div>
                    <div>Carchesio Michael</div>
                    <div>Crimaldi Alessia</div>
                </div>
            </div>
    );
});

export default React.memo(Footer);
