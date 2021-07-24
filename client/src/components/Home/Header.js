import SearchBar from "./SearchBar";
import classes from "./Header.module.css";

const Header = (props) => {
    return (
        <>
            <div className={classes.title}>NoloNolo Boat</div>
            <SearchBar
                openModalHandler={props.openModalHandler}
                closeModalHandler={props.closeModalHandler}
                isShow={props.isShow}
            />
        </>
    );
};

export default Header;
