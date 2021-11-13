import classes from "./Header.module.css";
import {NavLink} from "react-router-dom";
import React from "react";

const Header = () => {
    return (
        <div className={classes['wrapper']}>
            <div className={classes['header-container']}>
                <h1 className="title">Noleggi</h1>
                <div className={classes[`windows-bar`]}>
                    <NavLink
                        to='active'
                        className={({isActive}) => `${classes.normal}` + (isActive ? ` ${classes.selected}` : "")}
                    >
                        <span>Attivi</span>
                    </NavLink>
                    <NavLink
                        to='future'
                        className={({isActive}) => `${classes.normal}` + (isActive ? ` ${classes.selected}` : "")}
                    >
                        <span>Futuri</span>
                    </NavLink>
                    <NavLink
                        to='previous'
                        className={({isActive}) => `${classes.normal}` + (isActive ? ` ${classes.selected}` : "")}
                    >
                        <span>Passati</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Header;