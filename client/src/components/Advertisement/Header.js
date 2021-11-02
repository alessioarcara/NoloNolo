import {useHistory} from "react-router-dom";
import BackIcon from "../UI/icons/BackIcon";
import HeartIcon from "../UI/icons/MenuIcons/HeartIcon";
import classes from './Header.module.css';

const Header = () => {
    const history = useHistory();

    const goBackClickHandler = () => {
        history.goBack();
    }

    return (
        <div className={classes[`header-bar`]}>
            <div className={classes.container}>
                <div className={classes[`btn-back`]} onClick={goBackClickHandler}><BackIcon/></div>
                <div className={classes[`btn-favorite`]}><HeartIcon/></div>
            </div>
        </div>
    );
}

export default Header;