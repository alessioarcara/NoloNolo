import classes from "./Header.module.css";
import HeartIcon from "../UI/icons/MenuIcons/HeartIcon";
import {NavLink} from "react-router-dom";
import React from "react";
import SearchIcon from "../UI/icons/MenuIcons/SearchIcon";

const Header = () => {
    return (
        <>
            <h1 className="title">Noleggi</h1>
            <div className={classes[`windows-bar`]}>
                <NavLink to='/active' activeClassName={classes.selected}>
                    <div className={classes.window}>Attivi</div>
                </NavLink>
                <NavLink to='/future' activeClassName={classes.selected}>
                    <div className={classes.window}>Futuri</div>
                </NavLink>
                <NavLink to='/passed' activeClassName={classes.selected}>
                    <div className={classes.window}>Passati</div>
                </NavLink>
            </div>
        </>
    );
};

export default Header;