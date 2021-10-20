import React, {useState} from "react";
import logo from '../../assets/logo.png';
import './Navbar.css';
import BackIcon from "../UI/icons/BackIcon";
import {useHistory} from "react-router-dom";
import Filters from "../UI/icons/Filters";
import Filter from "./Filters/Filter";
import Modal from "../UI/Modal/Modal";

const Navbar = () => {
    /* useState per gestire la visualizzazione del menù */
    const [show, setShow] = useState(false)

    /* history per tornare alla pagina precedente */
    const history = useHistory()

    /* Function per tornare alla pagina precedente */
    const backPage = () => {
        history.push('/')
    }

    return (
        <nav className='nav'>
            <header className='nav-header'>
                <div className='nav-brand'>
                    <button
                        type='button'
                        className='btn-back'
                        onClick={backPage}
                    >
                        <BackIcon className='nav-icon'/>
                    </button>
                    <img src={logo} alt='logo' className='nav-logo'/>
                    <h4>51+ barche trovate</h4>
                </div>
                <button
                    type='button'
                    className='btn-filters'
                    onClick={() => setShow (true)}
                >
                    <Filters/>
                </button>
            </header>

            {show &&
                <Modal title='Ci pensiamo noi!' closeModalHandler={() => setShow (false)}>
                    <Filter/>
                </Modal>
            }
        </nav>
    );
};

export default Navbar;