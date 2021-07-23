import SearchBar from "./SearchBar";
import Search from "./Search";
import classes from "./Header.module.css";

const Header = (props) => {
    return (
        <>
            {!props.click &&
                <div className='title'>
                    <p>NoloNolo Boat</p>
                </div>
            }
            <SearchBar onClicked={props.changeHandler} click={props.click} onClose={props.homeHandler}/>
            {!props.click && <div className={classes[`main-image`]}/> }
            {props.click && <Search/>}
        </>
    );
};

export default Header;
