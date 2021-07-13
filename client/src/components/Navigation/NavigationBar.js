import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './NavigationBar.module.css';
import SearchIcon from "../UI/icons/SearchIcon";

const NavigationBar = () => {

    return (
        <nav className={classes.line}>
                <ul className={classes['nav-bar']}>
                    <li>
                        <NavLink className={classes.item} to="/">
                            <SearchIcon />
                            <div>Esplora</div>
                        </NavLink>
                    </li>
                    <NavLink to="/preferiti">Preferiti</NavLink>
                    <NavLink to="/accedi">Accedi</NavLink>
                </ul>
        </nav>
    );
};

export default NavigationBar;
