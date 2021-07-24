import React from "react";
import classes from "./Modal.module.css"

const Modal = ({title, children, overlay = 100}) => {

    if (overlay) {
        return <div className={classes["modal-fullscreen"]}>{children}</div>
    }

    return (
        <div className={classes.modal}>
            <header className={classes["modal-header"]}>
                <h1>{title}</h1>
            </header>
            <section className={classes["modal-content"]}>{children}</section>
            <span className={classes["modal-close"]}>&times;</span>
        </div>
    )
}

export default Modal;
