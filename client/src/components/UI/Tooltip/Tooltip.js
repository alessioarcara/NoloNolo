import classes from './Tooltip.module.css';
import {useCallback, useState} from "react";

const Tooltip = ({text, children}) => {
    const [isHover, setIsHover] = useState(false)

    const handleMutationEnterMouse = useCallback(()  => {
        setIsHover(true)
    }, [])

    const handleMutationLeaveMouse = useCallback(() => {
        setIsHover(false)
    }, [])

    return (
        <div className={classes['tooltip-wrapper']}>
            {isHover &&
                <div className={classes['container']}>
                    <div className={classes['tooltip-container']}>
                        {text}
                    </div>
                </div>
            }
            <div
                onMouseEnter={handleMutationEnterMouse}
                onMouseLeave={handleMutationLeaveMouse}
            >
                {children}
            </div>
        </div>
    );

}

export default Tooltip;