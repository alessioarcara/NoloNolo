import React, {useCallback, useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import classes from './NavigationBar.module.css';
import SearchIcon from "../UI/icons/MenuIcons/SearchIcon";
import HeartIcon from "../UI/icons/MenuIcons/HeartIcon";
import UserIcon from "../UI/icons/MenuIcons/UserIcon";

const NavigationBar = () => {
    const [navbar, setNavbar] = useState(true);
    const [scroll, setScroll] = useState(0);

    // const changeNavHandler = useCallback(() => {
    //     if (window.scrollY > scroll  ) {
    //         setNavbar(false)
    //     } else {
    //         setNavbar(true)
    //     }
    //     setScroll(window.scrollY)
    // }, [scroll])
    //
    // useEffect(() => {
    //     window.addEventListener('scroll', changeNavHandler);
    //     return () => {
    //         window.removeEventListener('scroll', changeNavHandler);
    //     }
    // }, [changeNavHandler])

    return (
        <nav>
            <ul className={navbar ? `${classes['nav-bar']} ${classes.action}` : `${classes['nav-bar']} ${classes['no-action']}`}>
                <li>
                    <NavLink to='/' exact activeClassName={classes.active} className={classes.item}>
                        <SearchIcon/>
                        <div>Esplora</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/preferiti' activeClassName={classes.active} className={classes.item}>
                        <HeartIcon className={classes.heart}/>
                        <div>Preferiti</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/profile' activeClassName={classes.active} className={classes.item}>
                        <UserIcon/>
                        <div>Accedi</div>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavigationBar;
