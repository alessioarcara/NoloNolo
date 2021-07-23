import React from "react";
import classes from "./Modal.module.css"

const Modal = props => {
    const {title, children, fullScreen} = props

    if (fullScreen) {
        return
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
