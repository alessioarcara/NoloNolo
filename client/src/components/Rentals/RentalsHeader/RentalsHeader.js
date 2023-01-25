import React from "react";
import classes from "./RentalsHeader.module.css";
import {NavLink} from "react-router-dom";
import Header from "../../UI/Header/Header";
import BackIcon from "../../UI/icons/BackIcon";

const RentalsHeader = () => {
    return (
            <Header
                textTitle="Noleggi"
                backElement={<BackIcon/>}
                navigatePath="/profile"
                classNameHeader={classes['bottom-header']}
            >
                {/* children */}
                <div className={classes[`windows-bar`]}>
                    <NavLink
                        to='previous'
                        className={({isActive}) => `${classes.normal}` + (isActive ? ` ${classes.selected}` : "")}
                    >
                        <span>Passati</span>
                    </NavLink>
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
                </div>

            </Header>
    )
}

export default React.memo(RentalsHeader)
