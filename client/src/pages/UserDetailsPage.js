import {useContext, useEffect} from "react";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import UserDetailsHeader from "../components/UserDetails/Header/UserDetailsHeader";
import UserInfo from "../components/UserDetails/UserInfo/UserInfo";
import UserDetails from "../components/UserDetails/UserDetails";
import {body_user} from "../helpers/httpConfig";

const UserDetailsPage = () => {
    const {token} = useContext(AuthContext)
    const {status, data: user, sendRequest} = useHttp(false)

    useEffect(() => {
        const transformDataUser = resData => resData.user
        sendRequest({body: body_user, token: token}, transformDataUser)
    }, [sendRequest, token])

    return (
        <>
            <UserDetailsHeader/>
            <UserInfo
                status={status}
                user={user && Object.keys(user).includes("addAvatarData") ? user.addAvatarData : user}
                token={token}
                sendFile={sendRequest}
            />
            <UserDetails
                user={user && Object.keys(user).includes("addAvatarData") ? user.addAvatarData : user}
            />
        </>
    );
};

export default UserDetailsPage;
