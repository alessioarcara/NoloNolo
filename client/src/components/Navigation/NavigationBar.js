import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationBar.module.css';

const NavigationBar = () => {

    return (
        <nav className={classes.line}>
            <div className={classes['nav-bar']}>
                <NavLink className={classes.item} to="/">
                    <div>Esplora</div>
                </NavLink>
                <NavLink to="/preferiti">Preferiti</NavLink>
                <NavLink to="/auth">Accedi</NavLink>
            </div>
        </nav>
    );
};

export default NavigationBar;
