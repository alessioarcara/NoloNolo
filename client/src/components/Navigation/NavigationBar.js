import React, {useEffect, useMemo, useState} from 'react';
import {NavLink} from 'react-router-dom';
import classes from './NavigationBar.module.css';
import SearchIcon from "../UI/icons/MenuIcons/SearchIcon";
import HeartIcon from "../UI/icons/MenuIcons/HeartIcon";
import UserIcon from "../UI/icons/MenuIcons/UserIcon";
import {throttle} from "../../helpers/utils";

const NavigationBar = ({authenticated}) => {
    const [showNavbar, setShowNavbar] = useState(true);

    const scrollHandler = useMemo(() => throttle(() => {
        if (showNavbar) { setShowNavbar(false) }

        const timer = setTimeout(() => {
            setShowNavbar(true)
        }, 1000)

        if (!showNavbar) { clearTimeout(timer) }
    }, 20), [showNavbar])

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler, { passive: true });
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [scrollHandler])

    return (
        <nav>
            <ul className={showNavbar ? `${classes['nav-bar']} ${classes.action}` : `${classes['nav-bar']} ${classes['no-action']}`}>
                <li>
                    <NavLink to='/' end className={navData => navData.isActive ? `${classes.active} ${classes.item}` : `${classes.item}`}>
                        <SearchIcon/>
                        <div>Esplora</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/favorites' className={navData => navData.isActive ? `${classes.selected} ${classes.item}` : `${classes.item}`}>
                        <HeartIcon className={classes.heart}/>
                        <div>Preferiti</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/profile' className={navData => navData.isActive ? `${classes.selected} ${classes.item}` : `${classes.item}`}>
                        <UserIcon/>
                        {authenticated ? <div>Profilo</div> : <div>Accedi</div>}
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavigationBar;
