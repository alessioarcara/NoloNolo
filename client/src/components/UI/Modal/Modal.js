import React from "react";
import ReactDOM from "react-dom"

import classes from "./Modal.module.css"

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onCancel} />;
};

const ModalOverlay = ({title, children, onCancel, adapterSize = "desktop"}) => {

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
    // const [show, setShow] = useState(true)
    //
    // const showHandler = () => { setShow(false) }
    //
    // if (!isShow) { return null}

    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onCancel={props.closeModalHandler}/>,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <ModalOverlay
                    title={props.title}
                    children={props.children}
                    adapterSize={props.adapterSize}
                    onCancel={props.closeModalHandler}
                />,
                document.getElementById('overlay-root')
            )}
        </>
    )
}

export default Modal;
