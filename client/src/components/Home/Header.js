import SearchBar from "./SearchBar";
import classes from "./Header.module.css";

const Header = props => {
    return (
        <>
            <div className={`title ${classes.title}`}>NoloNolo Boat</div>
            <SearchBar
                openModalHandler={props.openModalHandler}
                isShow={props.isShow}
            />
        </>
    );
};

export default Header;
