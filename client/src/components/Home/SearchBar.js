import classes from './SearchBar.module.css';
import SearchIcon from "../UI/icons/SearchIcon";
import {useCallback, useEffect, useState} from "react";

const SearchBar = (props) => {
    const [navbar, setNavbar] = useState(false);

    const changeBackground = useCallback(() => {
        if (window.scrollY >= 60) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', changeBackground);
        return () => {
            window.removeEventListener('scroll', changeBackground);
        }
    }, [changeBackground])



    return (
        <>
            <div
                className={(props.click || navbar) ? `${classes['background-searchbar']} ${classes['search-active']}` : `${classes['background-searchbar']} ${classes['search']}`}>
                <div onClick={props.onClicked} className={classes['search-bar']}>
                    <SearchIcon/>
                    <input type='search' placeholder='Da dove vuoi partire?'/>
                </div>
                {props.click && <p className={classes['btn-exit']} onClick={props.onClose}>Annulla</p>}
            </div>
        </>
    );
};

export default SearchBar;