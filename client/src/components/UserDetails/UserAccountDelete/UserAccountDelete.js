import classes from './UserAccountDelete.module.css';
import useHttp from "../../../hooks/use-http";
import {body_deleteUser} from "../../../helpers/httpConfig";
import Modal from "../../UI/Modal/Modal";
import React, {useContext, useState} from "react";
import ConfirmSection from "../../UI/ConfirmSection/ConfirmSection";
import AuthContext from "../../../store/auth-context";

const UserAccountDelete = () => {
    const {token} = useContext(AuthContext)
    const {data, status, sendRequest} = useHttp(true)
    const [modal, setModal] = useState(false)

    const handleDeleteAccount = () => {
        handleMutationModal()
        sendRequest({body: body_deleteUser, token}, resData => resData.deleteUser)
    }

    const handleMutationModal = () => {
        setModal(prevState => !prevState)
    }

    return (
        <>
            {status === 'completed' && data && data.deleteUserProblem &&
                <Modal title="Errore">{data.deleteUserProblem}</Modal>
            }
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
                    Procedi ora!
                </button>
            </div>
        </>
    );
}

export default UserAccountDelete;