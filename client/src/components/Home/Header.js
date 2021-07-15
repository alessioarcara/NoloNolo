import SearchBar from "./SearchBar";
import classes from "./Header.module.css";

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