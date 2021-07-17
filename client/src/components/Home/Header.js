import SearchBar from "./SearchBar";
import Modal from "./Modal";
import classes from "./Header.module.css";

const Header = () => {
    const [click, setClick] = useState(false);

    const clickChangeHandler = () => {
        setClick(true);
    }

    const clickHomeHandler = () => {
        setClick(false);
    }

    return (
        <>
            {!click &&
                <div className={classes.title}>
                    <p>NoloNolo Boat</p>
                </div>
            }
            <SearchBar onClicked={clickChangeHandler} click={click} onClose={clickHomeHandler}/>
            {click && <Modal/>}
        </>
    );
};

export default Header;