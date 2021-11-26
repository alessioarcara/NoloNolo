import {useNavigate, useLocation} from "react-router-dom";
import BackIcon from "../UI/icons/BackIcon";
import classes from './Header.module.css';
import Favorite from "../Favorite/Favorite";
import {useStore} from "../../hooks-store/store";
import {useCallback} from "react";

const Header = ({boatId}) => {
    const {state} = useLocation();
    const navigate = useNavigate();
    const store = useStore(true)[0]

    const goBackClickHandler = useCallback(() => {
        state ? navigate(-1) : navigate('/', {replace: true})
    }, [navigate])

    return (
        <div className={classes[`header-bar`]}>
            <div className={classes.container}>
                <div className={classes[`btn-back`]} onClick={goBackClickHandler}><BackIcon/></div>
                <Favorite
                    boatId={boatId}
                    advIsFavorite={store.userFavorites && store.userFavorites.some(favorite => favorite._id === boatId)}
                />
            </div>
        </div>
    );
}

export default Header;
