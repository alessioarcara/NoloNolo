import React, {useImperativeHandle, useRef} from "react";
import classes from './SearchBar.module.css';
import SearchIcon from "../icons/MenuIcons/SearchIcon";

const SearchBar = React.forwardRef((props, ref) => {
    const inputRef = useRef()

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        }
    }));

    const searchClasses =
        props.isShow || props.isWhite
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

export default React.memo(SearchBar);
