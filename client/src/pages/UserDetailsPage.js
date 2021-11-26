import React, {useCallback, useContext, useEffect} from "react";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import UserInfo from "../components/UserDetails/UserInfo/UserInfo";
import UserDetails from "../components/UserDetails/UserDetails/UserDetails";
import {body_user} from "../helpers/httpConfig";
import Modal from "../components/UI/Modal/Modal";
import Header from "../components/UI/Header/Header";
import BackIcon from "../components/UI/icons/BackIcon";

const UserDetailsPage = () => {
    const {token} = useContext(AuthContext)
    const {error, status, data: user, sendRequest} = useHttp(false)

    const sendData = useCallback(body_user =>
            sendRequest({body: body_user, token}, resData => resData[Object.keys(resData)]),
        [sendRequest, token])

    useEffect(() => {
        const transformDataUser = resData => resData.user
        sendRequest({body: body_user, token: token}, transformDataUser)
    }, [sendRequest, token])

    return (
        <>
            {status === 'completed' && error && <Modal title="Error">{error}</Modal>}
            {status === 'completed' && user && (
                Object.keys(user).includes("addAvatarProblem") && user.addAvatarProblem &&
                <Modal title="Error">{user.addAvatarProblem}</Modal>
            )}
            <Header
                backElement={<BackIcon/>}
                textTitle="Informazioni"
            />
            <UserInfo
                status={status}
                user={user && (
                    Object.keys(user).includes("addAvatarData") ? user.addAvatarData :
                    Object.keys(user).includes("updateUserData") ? user.updateUserData :
                    Object.keys(user).includes("changePasswordData") ? user.changePasswordData : user
                )}
                sendFile={sendData}
            />
            <UserDetails
                status={status}
                user={user && (
                    Object.keys(user).includes("addAvatarData") ? user.addAvatarData :
                    Object.keys(user).includes("updateUserData") ? user.updateUserData :
                    Object.keys(user).includes("changePasswordData") ? user.changePasswordData : user
                )}
                sendInfo={sendData}
            />
        </>
    );
};

export default UserDetailsPage;
