import classes from './Tooltip.module.css';
import {useCallback, useState} from "react";

const Tooltip = ({text, children, isShownTooltip = false, positionTop = true}) => {
    const [isHover, setIsHover] = useState(false)

    const handleEnterMouse = useCallback(() => {
        setIsHover(true)
    }, [])

    const handleLeaveMouse = useCallback(() => {
        setIsHover(false)
    }, [])

    if (!isShownTooltip) return children

    return (
        <div className={classes['tooltip-wrapper']}>
            {isHover &&
                <div className={`${classes['container']} ${positionTop ? classes["position-top"] : classes['position-left']}`} >
                    <div className={classes['tooltip-container']}>
                        {text}
                    </div>
                </div>
            }
            <div
                onMouseEnter={handleEnterMouse}
                onMouseLeave={handleLeaveMouse}
            >
                {children}
            </div>
        </div>
    );

}

export default Tooltip;
