import SearchBar from "./SearchBar";
import classes from "./SearchBar.module.css";
import backImage from "../../images/background.jpg";

const Header = () => {
    return (
        <>
            <div className={classes.title}>
                <p>NoloNolo Boat</p>
            </div>
            <SearchBar/>
        </>
    );
};

export default Header;