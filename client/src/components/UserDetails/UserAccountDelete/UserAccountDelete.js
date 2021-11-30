import classes from './UserAccountDelete.module.css';
import useHttp from "../../../hooks/use-http";
import {body_deleteUser} from "../../../helpers/httpConfig";
import Modal from "../../UI/Modal/Modal";
import React, {useContext, useState} from "react";
import ConfirmSection from "../../UI/ConfirmSection/ConfirmSection";
import AuthContext from "../../../store/auth-context";
import {destructurePayload} from "../../../helpers/Utils/utils";

const UserAccountDelete = () => {
    const {token, logout} = useContext(AuthContext)
    const {status, data: problem, error, sendRequest} = useHttp(true)
    const [modal, setModal] = useState(false)

    const handleDeleteAccount = () => {
        sendRequest({body: body_deleteUser, token}, resData => {
            const payload = destructurePayload(resData)
            if (payload[0])
                logout()
            else {
                handleMutationModal()
                return payload[1]
            }
        })
    }

    const handleMutationModal = () => {
        setModal(prevState => !prevState)
    }

    return (
        <>
            {status === 'completed' && error && <Modal title="Errore">{error}</Modal>}
            {status === 'completed' && problem && <Modal title="Errore">{problem}</Modal>}
            {modal &&
                <Modal closeModalHandler={handleMutationModal}>
                    <ConfirmSection
                        text="Sei sicuro di voler eliminare definitivamente il tuo account?"
                        onConfirm={handleDeleteAccount}
                    />
                </Modal>
            }
            <div className={classes['delete-account-container']}>
                <div className={classes['warning-text']}>
                    <span>Hai deciso di cancellare il tuo account?</span>
                </div>
                <button
                    className={classes['delete-btn']}
                    onClick={handleMutationModal}
                >
                    Procedi ora
                </button>
            </div>
        </>
    );
}

export default UserAccountDelete;