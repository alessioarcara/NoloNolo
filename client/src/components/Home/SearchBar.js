import React from "react";
import classes from './SearchBar.module.css';
import SearchIcon from "../UI/icons/MenuIcons/SearchIcon";
import {useCallback, useEffect, useState} from "react";

const SearchBar = React.forwardRef((props, ref) => {
    const [navbar, setNavbar] = useState(false);

    const listenToScroll = useCallback(() => {
        if (window.scrollY >= 60) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', listenToScroll);
        return () => {
            window.removeEventListener('scroll', listenToScroll);
        }
    }, [listenToScroll])

    const searchClasses =
        props.isShow || navbar
            ? `${classes['background-searchbar']} ${classes['search-active']}`
            : `${classes['background-searchbar']} ${classes['search']}`

    return (
        <div
            className={searchClasses}>
            <div onClick={props.openModalHandler} className={classes['search-bar']}>
                <SearchIcon/>
                <input
                    ref={ref}
                    type='search'
                    placeholder='Da dove vuoi partire?'
                />
            </div>
            {props.isShow && <p className={classes['btn-exit']} onClick={props.closeModalHandler}>Annulla</p>}
        </div>
    );
});

export default SearchBar;