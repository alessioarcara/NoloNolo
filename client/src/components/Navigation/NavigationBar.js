import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationBar.module.css';
import SearchIcon from "../UI/icons/SearchIcon";
import HeartIcon from "../UI/icons/HeartIcon";
import UserIcon from "../UI/icons/UserIcon";

const NavigationBar = () => {

    return (
        <nav>
            <ul className={classes['nav-bar']}>

                <li>
                    <NavLink to='/' exact activeClassName={classes.active} className={classes.item}>
                        <SearchIcon />
                        <div>Esplora</div>
                    </NavLink>
                </li>

                <li>
                    <NavLink to='/preferiti' activeClassName={classes.active} className={classes.item}>
                        <HeartIcon className={classes.heart} />
                        <div>Preferiti</div>
                    </NavLink>
                </li>

                <li>
                    <NavLink to='/profile' activeClassName={classes.active} className={classes.item}>
                        <UserIcon />
                        <div>Accedi</div>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavigationBar;
