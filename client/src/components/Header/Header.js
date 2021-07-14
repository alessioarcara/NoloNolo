import SearchBar from "./SearchBar";
import classes from "./SearchBar.module.css";

const Header = () => {
    return (
        <>
            <p className={classes.title}>NoloNolo</p>
            <SearchBar/>
        </>
    );
};

export default Header;