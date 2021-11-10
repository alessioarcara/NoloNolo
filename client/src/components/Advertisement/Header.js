import {useNavigate} from "react-router-dom";
import BackIcon from "../UI/icons/BackIcon";
import classes from './Header.module.css';
import Favorite from "../Favorite/Favorite";
import {useStore} from "../../hooks-store/store";

const Header = ({boatId}) => {
    const navigate = useNavigate();
    const store = useStore(true)[0]

    const goBackClickHandler = () => {
        navigate(-1);
    }

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
