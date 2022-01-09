import classes from './UserAccountDelete.module.css';
import {body_deleteUser} from "../../../helpers/httpConfig";
import Modal from "../../UI/Modal/Modal";
import React, {useCallback, useState} from "react";
import ConfirmSection from "../../UI/ConfirmSection/ConfirmSection";
import {destructurePayload} from "../../../helpers/Utils/utils";

const UserAccountDelete = ({sendDelete, logout}) => {
    const [isShowModal, setIsShowModal] = useState(false)

    const showOrHideModalHandler = useCallback(() => {
        setIsShowModal(prevState => !prevState)
    }, [])

    const deleteAccountHandler = useCallback(() => {
        sendDelete(body_deleteUser, resData => {
            const payload = destructurePayload(resData)
            if (payload[0])
                logout()
            else {
                showOrHideModalHandler()
                return payload[1]
            }
        })
    }, [sendDelete, showOrHideModalHandler, logout])

    return (
        <>
            {isShowModal &&
                <Modal closeModalHandler={showOrHideModalHandler}>
                    <ConfirmSection
                        text="Sei sicuro di voler eliminare definitivamente il tuo account?"
                        onConfirm={deleteAccountHandler}
                    />
                </Modal>
            }
            <div className={classes['delete-account-container']}>
                <div className={classes['warning-text']}>
                    <span>Hai deciso di cancellare il tuo account?</span>
                </div>
                <button
                    className={classes['delete-btn']}
                    onClick={showOrHideModalHandler}
                >
                    Procedi ora
                </button>
            </div>
        </>
    );
}

export default React.memo(UserAccountDelete);
