import React, {useEffect, useState} from "react";
import classes from "./Notification.module.css"
import ReactDOM from "react-dom";

const Toast = ({message, status, duration = 3000}) => {
    const [isShown, setIsShown] = useState(true)

    let specialClasses = classes.default;
    if (status === 'error') specialClasses = classes.error;
    if (status === 'success') specialClasses = classes.success;
    const cssClasses = `${classes.notification} ${specialClasses}`;

    useEffect(() => {
        if (isShown === true) {
            setTimeout(() => {
                setIsShown(false)
            }, duration)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShown])

    if (!isShown) { return null }

    return (
        <div className={cssClasses}>
            {message}
        </div>
    )
}

const Notification = (props) => {
    return ReactDOM.createPortal(
        <Toast {...props}/>,
        document.getElementById('overlay-root')
    )
}

export default Notification;
