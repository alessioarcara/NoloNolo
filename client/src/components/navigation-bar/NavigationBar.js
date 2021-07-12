import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationBar.module.css';
import SearchIcon from "../UI/icons/SearchIcon";

const NavigationBar = () => {

    return (
        <nav className={classes.line}>
            <div className={classes['nav-bar']}>
                <NavLink className={classes.item} to="/">
                    <div>Esplora</div>
                </NavLink>
                <NavLink to="/preferiti">Preferiti</NavLink>
                <NavLink to="/accedi">Accedi</NavLink>
            </div>
        </nav>
    );
};

export default NavigationBar;