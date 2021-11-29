import classes from './Header.module.css';
import {useNavigate} from "react-router-dom";
import {useCallback} from "react";

const Header = ({
                    classNameHeader,
                    navigatePath,
                    backElement,
                    textTitle,
                    optionsElement,
                    handleOptionsElement,
                    children}) => {
    const navigate = useNavigate()

    const goThroughPage = useCallback(() => {
        navigatePath ? navigate(navigatePath) : navigate(-1)
    }, [navigate, navigatePath])

    return (
        <div className={`${classes['wrapper']} ${classNameHeader}`}>
            <div className={classes['container']}>
                <div className={classes['header-container']}>
                    <div
                        className={classes['first-element']}
                        onClick={goThroughPage}
                    >
                        {backElement}
                    </div>
                    <h1 className={`${classes['second-element']} title`}>{textTitle}</h1>
                    <div
                        className={classes['third-element']}
                        onClick={handleOptionsElement}
                    >
                        {optionsElement}
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Header