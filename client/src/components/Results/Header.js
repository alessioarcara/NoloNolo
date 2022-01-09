import React, {useCallback, useState} from "react";
import classes from './Header.module.css';
import BackIcon from "../UI/icons/BackIcon";
import {Link} from "react-router-dom";
import FiltersIcon from "../UI/icons/FiltersIcon";
import Filter from "./Filters/Filter";
import Modal from "../UI/Modal/Modal";

const Header = ({onSubmitFilters, boatsNumber, boatsMaxPrice}) => {
    /* useState per gestire la visualizzazione del menù */
    const [isShownModal, setIsShownModal] = useState(false)

    const showOrHideModalHandler = useCallback(() => {
        setIsShownModal(prevState => !prevState)
    }, [])

    return (
        <>
            {isShownModal &&
                <Modal title='Filtra i tuoi risultati' closeModalHandler={showOrHideModalHandler}>
                    <Filter
                        onSubmitFilters={onSubmitFilters} onClose={showOrHideModalHandler} boatsMaxPrice={boatsMaxPrice}
                    />
                </Modal>
            }
            <header className={classes['results-header']}>
                <Link
                    to={-1}
                    className={classes['btn-back']}
                >
                    <BackIcon/>
                </Link>
                <div className='subtitle'>{!boatsNumber ?
                    "Caricamento risultati ..." :
                    typeof(boatsNumber) === "number" ? `${boatsNumber} barche trovate` : boatsNumber}</div>
                <button
                    type='button'
                    className={classes['btn-filters']}
                    onClick={showOrHideModalHandler}
                >
                    <FiltersIcon/>
                </button>
            </header>
        </>
    );
};

export default React.memo(Header);
