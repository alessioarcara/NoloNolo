import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom"

import classes from "./Modal.module.css"

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onCancel} />;
};

const ModalOverlay = ({title, children, onCancel, adapterSize = "desktop"}) => {

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = 'unset' };
    }, [])

    if (adapterSize === "smartphone") {
        return <div className={classes["modal-fullscreen"]}>{children}</div>
    }

    return (
        <div className={classes.modal}>
            <header className={classes["modal-header"]}>
                <h1>{title}</h1>
            </header>
            <section className={classes["modal-content"]}>{children}</section>
            <span onClick={onCancel} className={classes["modal-close"]}>&times;</span>
        </div>
    );
};

const Modal = (props) => {
    const [isShown, setIsShown] = useState(true)

    const showHandler = () => { setIsShown(false) }

    if (!isShown) { return null}

    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onCancel={props.closeModalHandler || showHandler}/>,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <ModalOverlay
                    title={props.title}
                    children={props.children}
                    adapterSize={props.adapterSize}
                    onCancel={props.closeModalHandler || showHandler}
                />,
                document.getElementById('overlay-root')
            )}
        </>
    )
}

export default Modal;
