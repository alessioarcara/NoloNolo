import SearchBar from "./SearchBar";
import classes from "./SearchBar.module.css";
import backImage from "../../images/background.jpg";

const Header = () => {
    return (
        <>
            <header>
                <div className={classes.title}>
                    <p>NoloNolo Boat</p>
                </div>
                <SearchBar/>
                <div className={classes[`main-image`]}>
                    <img src={backImage} alt="An image with a boat"/>
                </div>
            </header>
        </>
    );
};

export default Header;