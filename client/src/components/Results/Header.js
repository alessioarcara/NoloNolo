import React, {useState} from "react";
import classes from './Header.module.css';
import BackIcon from "../UI/icons/BackIcon";
import {useHistory} from "react-router-dom";
import FiltersIcon from "../UI/icons/FiltersIcon";
import Filter from "./Filters/Filter";
import Modal from "../UI/Modal/Modal";

const Header = ({onSubmitFilters, boatsNumber, boatsMaxPrice}) => {
    /* useState per gestire la visualizzazione del menù */
    const [show, setShow] = useState(false)

    /* history per tornare alla pagina precedente */
    const history = useHistory()

    /* Function per tornare alla pagina precedente */
    const backPage = () => {
        history.push('/')
    }

    const showHandler = () => {
        setShow(prevState => !prevState)
    }

    return (
        <>
            <header className={classes['results-header']}>
                <button
                    type='button'
                    className={classes['btn-back']}
                    onClick={backPage}
                >
                    <BackIcon/>
                </button>
                <div className='subtitle'>{!boatsNumber ?
                    "Caricamento risultati ..." :
                    typeof(boatsNumber) === "number" ? `${boatsNumber} barche trovate` : boatsNumber}</div>
                <button
                    type='button'
                    className={classes['btn-filters']}
                    onClick={showHandler}
                >
                    <FiltersIcon/>
                </button>
            </header>
            {show &&
            <Modal title='Filtra i tuoi risultati' closeModalHandler={showHandler}>
                <Filter
                    onSubmitFilters={onSubmitFilters} onClose={showHandler} boatsMaxPrice={boatsMaxPrice}
                />
            </Modal>
            }
        </>
    );
};

export default Header;
