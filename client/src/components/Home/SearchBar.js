import React, {useImperativeHandle, useMemo, useRef} from "react";
import classes from './SearchBar.module.css';
import SearchIcon from "../UI/icons/MenuIcons/SearchIcon";
import {useEffect, useState } from "react";
import {throttle} from "../../helpers/Utils/utils";

const SearchBar = React.forwardRef((props, ref) => {
    const [isWhite, setIsWhite] = useState(props.isWhite);
    const inputRef = useRef()

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        }
    }));

    const listenToScroll = useMemo(() => throttle(() => {
        if (window.scrollY >= 60) {
            setIsWhite(true);
        } else {
            setIsWhite(false);
        }
    }, 20), [])

    useEffect(() => {
        window.addEventListener('scroll', listenToScroll, { passive: true });
        return () => window.removeEventListener('scroll', listenToScroll);
    }, [listenToScroll])

    const searchClasses =
        props.isShow || isWhite
            ? `${classes['background-searchbar']} ${classes['search-active']}`
            : `${classes['background-searchbar']} ${classes['search']}`

    return (
        <div className={searchClasses}>
            <div onClick={props.openModalHandler} className={classes['search-bar']}>
                <SearchIcon/>
                <input
                    ref={inputRef}
                    type='search'
                    value={props.searchTerm}
                    onChange={props.changeHandler}
                    placeholder='Da dove vuoi partire?'
                />
            </div>
        </div>
    );
});

export default SearchBar;
