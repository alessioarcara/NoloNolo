import React, {forwardRef, useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import classes from './NavigationBar.module.css';
import SearchIcon from "../icons/MenuIcons/SearchIcon";
import HeartIcon from "../icons/MenuIcons/HeartIcon";
import UserIcon from "../icons/MenuIcons/UserIcon";
import {useStore} from "../../../hooks-store/store";

const NavigationBar = forwardRef(({authenticated, isIntersecting}, navigationRef) => {
    const [btnIsClicked, setBtnIsClicked] = useState(false)
    const { userFavorites } = useStore()[0];

    useEffect(() => {
        if (!userFavorites || userFavorites.length === 0) return;

        setBtnIsClicked(true);
        const bumpTimer = setTimeout(() => setBtnIsClicked(false), 300)

        return () => clearTimeout(bumpTimer);
    }, [userFavorites])

    const btnClasses = `${classes.item} ${btnIsClicked ? classes.bump : ""}`

    return (
        <nav ref={navigationRef}>
            <ul className={isIntersecting ? `${classes['nav-bar']} ${classes.hide}` : `${classes['nav-bar']} ${classes.show}`}>
                <li>
                    <NavLink to='/' end className={navData => navData.isActive ? `${classes.active} ${classes.item}` : `${classes.item}`}>
                        <SearchIcon/>
                        <div>Esplora</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink style={{position: "relative"}} to='favorites' className={navData => navData.isActive ? `${btnClasses} ${classes.active}` : `${btnClasses}`}>
                        <HeartIcon className={classes.heart}/>
                        {userFavorites && userFavorites.length > 0 && <div className={classes["user-favorites-counter"]}>{userFavorites.length}</div>}
                        <div>Preferiti</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='profile' className={navData => navData.isActive ? `${classes.active} ${classes.item}` : `${classes.item}`}>
                        <UserIcon/>
                        {authenticated ? <div>Account</div> : <div>Accedi</div>}
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
});

export default React.memo(NavigationBar);
