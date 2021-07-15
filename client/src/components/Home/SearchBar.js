import classes from './SearchBar.module.css';
import SearchIcon from "../UI/icons/SearchIcon";
import {useState} from "react";

const SearchBar = () => {
    const [navbar, setNavbar] = useState(false);

    const changeBackground = () => {
        if (window.scrollY >= 60) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }

    window.addEventListener('scroll', changeBackground);

    return (
        <div className={navbar ? `${classes['background-searchbar']} ${classes['search-active']}` : `${classes['background-searchbar']} ${classes['search']}`}>
            <div className={classes['search-bar']}>
                <SearchIcon/>
                <input type='search' placeholder='Qual è la tua meta?'/>
            </div>
        </div>
    );
};

export default SearchBar;