import classes from './Tooltip.module.css';
import {useState} from "react";

const Tooltip = ({text, children}) => {
    const [isHover, setIsHover] = useState(false)

    return (
        <div className={classes['tooltip-wrapper']}>
            {isHover &&
                <div className={classes['container']}>
                    <div className={classes['tooltip-container']}>
                        {text}
                    </div>
                </div>
            }
            <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>{children}</div>
        </div>
    );

}

export default Tooltip;