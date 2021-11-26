import React, {useCallback, useContext, useEffect, useState} from "react";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import UserDetailsHeader from "../components/UserDetails/Header/UserDetailsHeader";
import UserInfo from "../components/UserDetails/UserInfo/UserInfo";
import UserDetails from "../components/UserDetails/UserDetails/UserDetails";
import {body_user} from "../helpers/httpConfig";
import Modal from "../components/UI/Modal/Modal";
import {parseMutationResponse} from "../helpers/utils";

const UserDetailsPage = () => {
    const {token} = useContext(AuthContext)
    const [user, setUser] = useState(null)
    const {error, status, data: problem, sendRequest} = useHttp(false)

    const sendData = useCallback(body => sendRequest({body, token}, parseMutationResponse(setUser)),
        [sendRequest, token])

    useEffect(() => sendRequest({body: body_user, token}, resData => setUser(resData.user)),
        [sendRequest, token])

    return (
        <>
            {status === 'completed' && error && <Modal title="Error">{error}</Modal>}
            {status === 'completed' && problem && <Modal title="Error">{problem}</Modal>}
            <UserDetailsHeader/>
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
        </>
    );
};

export default UserDetailsPage;
