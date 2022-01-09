import React, {useCallback, useContext, useEffect, useState} from "react";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import UserInfo from "../components/UserDetails/UserInfo/UserInfo";
import UserDetails from "../components/UserDetails/UserDetails/UserDetails";
import {body_user} from "../helpers/httpConfig";
import Modal from "../components/UI/Modal/Modal";
import {parseMutationResponse} from "../helpers/Utils/utils";
import Header from "../components/UI/Header/Header";
import BackIcon from "../components/UI/icons/BackIcon";
import UserAccountDelete from "../components/UserDetails/UserAccountDelete/UserAccountDelete";

const UserDetailsPage = () => {
    const {token, logout} = useContext(AuthContext)
    const [user, setUser] = useState(null)
    const {error, status, data: problem, sendRequest} = useHttp(false)

    const sendData = useCallback((body, applyData = parseMutationResponse(setUser)) => {
        sendRequest({body, token}, applyData)
    }, [sendRequest, token])

    useEffect(() => {
        sendRequest({body: body_user, token}, resData => setUser(resData.user))
    }, [sendRequest, token] )

    return (
        <>
            {status === 'completed' && error && <Modal title="Error">{error}</Modal>}
            {status === 'completed' && problem && <Modal title="Error">{problem}</Modal>}
            <Header
                backElement={<BackIcon/>}
                textTitle="Informazioni"
            />
            <UserInfo
                status={status}
                user={user}
                sendFile={sendData}
            />
            <UserDetails
                status={status}
                user={user}
                sendInfo={sendData}
            />
            <UserAccountDelete
                sendDelete={sendData}
                logout={logout}
            />
        </>
    );
};

export default UserDetailsPage;
